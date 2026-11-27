-- ============================================================================
-- MA2 Tanuló — 2. lépés: elméleti teszt + hibajelzések (flag).
-- Run ONCE in Supabase → SQL Editor, AFTER setup.sql. Safe to run again.
-- ============================================================================

-- ---------- elméleti teszt: every attempt is kept ----------
create table if not exists public.quiz_attempts (
  id          uuid primary key default gen_random_uuid(),
  username    text not null references public.learners(username) on delete cascade,
  started_at  timestamptz not null default now(),
  finished_at timestamptz,
  duration_s  integer,                       -- measured by the server
  score       integer,
  total       integer,
  passed      boolean,
  answers     jsonb not null default '[]'::jsonb
);
create index if not exists quiz_attempts_username_idx on public.quiz_attempts (username, started_at desc);

-- ---------- hibajelzések a leckékhez ----------
create table if not exists public.lesson_reports (
  id         uuid primary key default gen_random_uuid(),
  username   text not null references public.learners(username) on delete cascade,
  lesson_id  text not null,
  step_id    text,
  step_title text,
  comment    text not null,
  status     text not null default 'uj' check (status in ('uj', 'megoldva')),
  created_at timestamptz not null default now()
);
create index if not exists lesson_reports_created_idx on public.lesson_reports (created_at desc);

alter table public.quiz_attempts  enable row level security;
alter table public.lesson_reports enable row level security;
revoke all on public.quiz_attempts, public.lesson_reports from anon;
grant select, delete         on public.quiz_attempts  to authenticated;
grant select, update, delete on public.lesson_reports to authenticated;

drop policy if exists "admin reads quiz"      on public.quiz_attempts;
drop policy if exists "admin deletes quiz"    on public.quiz_attempts;
drop policy if exists "admin reads reports"   on public.lesson_reports;
drop policy if exists "admin updates reports" on public.lesson_reports;
drop policy if exists "admin deletes reports" on public.lesson_reports;
create policy "admin reads quiz"      on public.quiz_attempts  for select to authenticated using (public.is_admin());
create policy "admin deletes quiz"    on public.quiz_attempts  for delete to authenticated using (public.is_admin());
create policy "admin reads reports"   on public.lesson_reports for select to authenticated using (public.is_admin());
create policy "admin updates reports" on public.lesson_reports for update to authenticated using (public.is_admin());
create policy "admin deletes reports" on public.lesson_reports for delete to authenticated using (public.is_admin());

-- ---------- learner functions ----------
create or replace function public.learner_quiz_start(p_username text)
returns json language plpgsql security definer set search_path = public as $$
declare u text := lower(trim(p_username)); r quiz_attempts;
begin
  if u !~ '^[a-z0-9._-]{2,32}$' then raise exception 'invalid username'; end if;
  insert into learners (username, display_name) values (u, u) on conflict (username) do nothing;
  insert into quiz_attempts (username) values (u) returning * into r;
  return json_build_object('id', r.id, 'started_at', r.started_at);
end $$;

create or replace function public.learner_quiz_finish(p_username text, p_id uuid, p_score int, p_total int, p_answers jsonb)
returns json language plpgsql security definer set search_path = public as $$
declare u text := lower(trim(p_username)); r quiz_attempts;
begin
  if u !~ '^[a-z0-9._-]{2,32}$' then raise exception 'invalid username'; end if;
  if p_total is null or p_total < 1 or p_total > 100 or p_score is null or p_score < 0 or p_score > p_total then raise exception 'bad score'; end if;
  if pg_column_size(p_answers) > 100000 then raise exception 'answers too large'; end if;
  update quiz_attempts
     set finished_at = now(),
         duration_s  = greatest(0, round(extract(epoch from now() - started_at)))::int,
         score = p_score, total = p_total,
         passed = (p_score * 100 >= p_total * 80),
         answers = coalesce(p_answers, '[]'::jsonb)
   where id = p_id and username = u and finished_at is null
  returning * into r;
  if r.id is null then raise exception 'attempt not found or already finished'; end if;
  return json_build_object('id', r.id, 'started_at', r.started_at, 'finished_at', r.finished_at,
    'duration_s', r.duration_s, 'score', r.score, 'total', r.total, 'passed', r.passed);
end $$;

create or replace function public.learner_report(p_username text, p_lesson text, p_step text, p_title text, p_comment text)
returns uuid language plpgsql security definer set search_path = public as $$
declare u text := lower(trim(p_username)); new_id uuid;
begin
  if u !~ '^[a-z0-9._-]{2,32}$' then raise exception 'invalid username'; end if;
  if coalesce(trim(p_comment), '') = '' then raise exception 'empty comment'; end if;
  insert into learners (username, display_name) values (u, u) on conflict (username) do nothing;
  insert into lesson_reports (username, lesson_id, step_id, step_title, comment)
  values (u, left(p_lesson, 8), left(p_step, 40), left(p_title, 200), left(p_comment, 2000))
  returning id into new_id;
  return new_id;
end $$;

-- learner_load now also returns the learner's quiz attempts
create or replace function public.learner_load(p_username text, p_display text default null)
returns json language plpgsql security definer set search_path = public as $$
declare
  u text := lower(trim(p_username));
  r json;
begin
  if u !~ '^[a-z0-9._-]{2,32}$' then raise exception 'invalid username'; end if;
  insert into learners (username, display_name)
  values (u, left(coalesce(nullif(trim(p_display), ''), u), 60))
  on conflict (username) do nothing;

  select json_build_object(
    'username', l.username,
    'display_name', l.display_name,
    'progress', l.progress,
    'pct', l.pct,
    'submissions', coalesce((
      select json_agg(json_build_object(
        'id', s.id, 'file_name', s.file_name, 'note', s.note, 'status', s.status,
        'feedback', s.feedback, 'task_feedback', s.task_feedback,
        'created_at', s.created_at, 'reviewed_at', s.reviewed_at) order by s.created_at desc)
      from exam_submissions s where s.username = l.username), '[]'::json),
    'quiz', coalesce((
      select json_agg(json_build_object(
        'id', q.id, 'started_at', q.started_at, 'finished_at', q.finished_at, 'duration_s', q.duration_s,
        'score', q.score, 'total', q.total, 'passed', q.passed) order by q.started_at desc)
      from quiz_attempts q where q.username = l.username and q.finished_at is not null), '[]'::json)
  ) into r
  from learners l where l.username = u;
  return r;
end $$;

-- the show can only be uploaded after a passed quiz (80%)
create or replace function public.learner_submit(p_username text, p_file_path text, p_file_name text, p_note text)
returns uuid language plpgsql security definer set search_path = public as $$
declare
  u text := lower(trim(p_username));
  new_id uuid;
begin
  if u !~ '^[a-z0-9._-]{2,32}$' then raise exception 'invalid username'; end if;
  if p_file_path is null or p_file_path not like u || '/%' then raise exception 'bad file path'; end if;
  if not exists (select 1 from quiz_attempts q where q.username = u and q.passed) then
    raise exception 'Előbb az elméleti tesztet kell teljesíteni (80%%).';
  end if;
  insert into exam_submissions (username, file_path, file_name, note)
  values (u, p_file_path, left(p_file_name, 200), left(p_note, 2000))
  returning id into new_id;
  return new_id;
end $$;

revoke all on function public.learner_quiz_start(text)                         from public;
revoke all on function public.learner_quiz_finish(text, uuid, int, int, jsonb) from public;
revoke all on function public.learner_report(text, text, text, text, text)     from public;
grant execute on function public.learner_quiz_start(text)                         to anon, authenticated;
grant execute on function public.learner_quiz_finish(text, uuid, int, int, jsonb) to anon, authenticated;
grant execute on function public.learner_report(text, text, text, text, text)     to anon, authenticated;

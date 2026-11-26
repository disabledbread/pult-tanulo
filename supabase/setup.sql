-- ============================================================================
-- MA2 Tanuló — Supabase setup. Run ONCE in: Supabase dashboard → SQL Editor.
--
-- Model:
--   * Learners have NO password: they type a username, the site stores their
--     progress under it. Learner access goes only through the functions below
--     (security definer), never directly to the tables.
--   * The admin (you) logs in with a normal Supabase Auth user (email+password)
--     that is listed in public.admins. Only admins can read all learners,
--     read exam submissions, download exam files and write feedback.
-- ============================================================================

-- ---------- tables ----------
create table if not exists public.learners (
  username       text primary key check (username ~ '^[a-z0-9._-]{2,32}$'),
  display_name   text,
  progress       jsonb not null default '{}'::jsonb,
  pct            real  not null default 0,
  current_lesson text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table if not exists public.exam_submissions (
  id            uuid primary key default gen_random_uuid(),
  username      text not null references public.learners(username) on delete cascade,
  file_path     text not null,
  file_name     text,
  note          text,
  status        text not null default 'bekuldve' check (status in ('bekuldve', 'elfogadva', 'javitando')),
  feedback      text,
  task_feedback jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  reviewed_at   timestamptz
);
create index if not exists exam_submissions_username_idx on public.exam_submissions (username, created_at desc);

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.learners         enable row level security;
alter table public.exam_submissions enable row level security;
alter table public.admins           enable row level security;

-- Explicit API permissions (the project does NOT auto-grant new tables).
-- anon (learners, no login) gets NO table access: it only calls the functions below.
-- authenticated (the admin login) gets table access, filtered by the RLS policies.
revoke all on public.learners, public.exam_submissions, public.admins from anon;
grant select, update, delete on public.learners         to authenticated;
grant select, update, delete on public.exam_submissions to authenticated;
grant select                 on public.admins           to authenticated;

-- ---------- admin check ----------
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------- admin policies (tables are closed to everyone else) ----------
drop policy if exists "admin reads learners"      on public.learners;
drop policy if exists "admin updates learners"    on public.learners;
drop policy if exists "admin deletes learners"    on public.learners;
drop policy if exists "admin reads submissions"   on public.exam_submissions;
drop policy if exists "admin updates submissions" on public.exam_submissions;
drop policy if exists "admin deletes submissions" on public.exam_submissions;
drop policy if exists "admin sees own row"        on public.admins;

create policy "admin reads learners"      on public.learners         for select to authenticated using (public.is_admin());
create policy "admin updates learners"    on public.learners         for update to authenticated using (public.is_admin());
create policy "admin deletes learners"    on public.learners         for delete to authenticated using (public.is_admin());
create policy "admin reads submissions"   on public.exam_submissions for select to authenticated using (public.is_admin());
create policy "admin updates submissions" on public.exam_submissions for update to authenticated using (public.is_admin());
create policy "admin deletes submissions" on public.exam_submissions for delete to authenticated using (public.is_admin());
create policy "admin sees own row"        on public.admins           for select to authenticated using (user_id = auth.uid());

-- ---------- learner functions (username only) ----------
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
      from exam_submissions s where s.username = l.username), '[]'::json)
  ) into r
  from learners l where l.username = u;
  return r;
end $$;

create or replace function public.learner_save(p_username text, p_progress jsonb, p_pct real, p_lesson text)
returns void language plpgsql security definer set search_path = public as $$
declare u text := lower(trim(p_username));
begin
  if u !~ '^[a-z0-9._-]{2,32}$' then raise exception 'invalid username'; end if;
  if pg_column_size(p_progress) > 200000 then raise exception 'progress too large'; end if;
  insert into learners (username, display_name, progress, pct, current_lesson, updated_at)
  values (u, u, coalesce(p_progress, '{}'::jsonb), greatest(0, least(1, coalesce(p_pct, 0))), left(p_lesson, 8), now())
  on conflict (username) do update
    set progress = excluded.progress, pct = excluded.pct,
        current_lesson = excluded.current_lesson, updated_at = now();
end $$;

create or replace function public.learner_submit(p_username text, p_file_path text, p_file_name text, p_note text)
returns uuid language plpgsql security definer set search_path = public as $$
declare
  u text := lower(trim(p_username));
  new_id uuid;
begin
  if u !~ '^[a-z0-9._-]{2,32}$' then raise exception 'invalid username'; end if;
  if p_file_path is null or p_file_path not like u || '/%' then raise exception 'bad file path'; end if;
  insert into exam_submissions (username, file_path, file_name, note)
  values (u, p_file_path, left(p_file_name, 200), left(p_note, 2000))
  returning id into new_id;
  return new_id;
end $$;

grant execute on function public.is_admin() to anon, authenticated;

revoke all on function public.learner_load(text, text)                  from public;
revoke all on function public.learner_save(text, jsonb, real, text)     from public;
revoke all on function public.learner_submit(text, text, text, text)    from public;
grant execute on function public.learner_load(text, text)               to anon, authenticated;
grant execute on function public.learner_save(text, jsonb, real, text)  to anon, authenticated;
grant execute on function public.learner_submit(text, text, text, text) to anon, authenticated;

-- ---------- storage: private bucket for the uploaded show files ----------
insert into storage.buckets (id, name, public, file_size_limit)
values ('exams', 'exams', false, 52428800)          -- 50 MB per file
on conflict (id) do nothing;

drop policy if exists "learners upload exam files" on storage.objects;
drop policy if exists "admin reads exam files"     on storage.objects;
drop policy if exists "admin deletes exam files"   on storage.objects;

create policy "learners upload exam files" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'exams' and (storage.foldername(name))[1] ~ '^[a-z0-9._-]{2,32}$');
create policy "admin reads exam files" on storage.objects for select to authenticated
  using (bucket_id = 'exams' and public.is_admin());
create policy "admin deletes exam files" on storage.objects for delete to authenticated
  using (bucket_id = 'exams' and public.is_admin());

-- ---------- make YOURSELF admin ----------
-- 1. Dashboard → Authentication → Users → "Add user" → "Create new user"
--    (your email + a password, tick "Auto Confirm User").
-- 2. Then run this line with YOUR email:
-- insert into public.admins (user_id) select id from auth.users where email = 'te@pelda.hu';

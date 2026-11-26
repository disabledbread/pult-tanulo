/* MA2 Tanuló — Supabase connection.
   From Supabase dashboard → Project Settings → API Keys (legacy) → "anon public".
   The anon key is meant to be public: it can only do what supabase/setup.sql allows
   (learners: save/load own progress by username, upload exam files; no table access).
   NEVER put the service_role / secret key here. */
window.MA_CONFIG = {
  supabaseUrl: 'https://oaiqqyvagdxdvdixlxgf.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9haXFxeXZhZ2R4ZHZkaXhseGdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU2OTgzNjEsImV4cCI6MjExMTI3NDM2MX0.6p8Nj5eMB7BjviiT8nySBNBzlQITpEPj8icM3i7Q1AE'
};

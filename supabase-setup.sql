-- ============================================================
-- Digital Chemistry Learning Hub — Supabase 数据库初始化脚本
-- 在 Supabase Dashboard → SQL Editor 中执行此脚本
-- ============================================================

-- 批注表
create table if not exists annotations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  page_id text not null,
  selected_text text not null,
  note text not null,
  color text default 'yellow',
  container_id text default 'content-main',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 页面笔记表
create table if not exists page_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  page_id text not null,
  content text not null default '',
  updated_at timestamptz default now(),
  unique(user_id, page_id)
);

-- 学习进度表
create table if not exists progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  lesson_id text not null,
  status text default 'in_progress', -- 'in_progress' | 'completed'
  quiz_score integer,
  completed_at timestamptz,
  unique(user_id, lesson_id)
);

-- 测验记录表
create table if not exists quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  quiz_id text not null,
  score integer not null,
  total integer not null,
  answers jsonb,
  attempted_at timestamptz default now()
);

-- ── Row Level Security ──
alter table annotations enable row level security;
alter table page_notes enable row level security;
alter table progress enable row level security;
alter table quiz_attempts enable row level security;

-- Annotations RLS
create policy "Users can manage own annotations"
  on annotations for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Page notes RLS
create policy "Users can manage own page_notes"
  on page_notes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Progress RLS
create policy "Users can manage own progress"
  on progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Quiz attempts RLS
create policy "Users can manage own quiz_attempts"
  on quiz_attempts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

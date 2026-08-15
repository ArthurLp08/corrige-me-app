  -- ============================================================
  -- Corrige-Me — FASE 11: Banco de dados e segurança
  -- Aplicar no SQL Editor do Supabase Dashboard.
  -- ============================================================

  -- ------------------------------------------------------------
  -- Profiles
  -- ------------------------------------------------------------
  create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    email text,
    display_name text,
    created_at timestamptz not null default now()
  );

  -- Corrige bancos criados antes da coluna existir
  alter table public.profiles
    add column if not exists display_name text;

  alter table public.profiles enable row level security;

  drop policy if exists "profiles_select_own" on public.profiles;
  create policy "profiles_select_own"
    on public.profiles for select
    using (auth.uid() = id);

  drop policy if exists "profiles_update_own" on public.profiles;
  create policy "profiles_update_own"
    on public.profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

  -- Cria automaticamente o perfil no cadastro
  create or replace function public.handle_new_user()
  returns trigger
  language plpgsql
  security definer set search_path = public
  as $$
  begin
    insert into public.profiles (id, email, display_name)
    values (
      new.id,
      new.email,
      coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1))
    );
    return new;
  end;
  $$;

  drop trigger if exists on_auth_user_created on auth.users;
  create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

  -- ------------------------------------------------------------
  -- Essays
  -- ------------------------------------------------------------
  create table if not exists public.essays (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    theme text not null,
    text text not null,
    word_count integer not null,
    created_at timestamptz not null default now()
  );

  create index if not exists essays_user_id_idx on public.essays (user_id);

  alter table public.essays enable row level security;

  drop policy if exists "essays_select_own" on public.essays;
  create policy "essays_select_own"
    on public.essays for select
    using (auth.uid() = user_id);

  drop policy if exists "essays_insert_own" on public.essays;
  create policy "essays_insert_own"
    on public.essays for insert
    with check (auth.uid() = user_id);

  -- ------------------------------------------------------------
  -- Corrections
  -- ------------------------------------------------------------
  create table if not exists public.corrections (
    id uuid primary key default gen_random_uuid(),
    essay_id uuid not null references public.essays (id) on delete cascade,
    user_id uuid not null references public.profiles (id) on delete cascade,
    total_score integer not null,
    general_feedback text not null,
    strengths jsonb not null default '[]'::jsonb,
    improvements jsonb not null default '[]'::jsonb,
    created_at timestamptz not null default now()
  );

  create index if not exists corrections_user_id_idx on public.corrections (user_id);

  alter table public.corrections enable row level security;

  drop policy if exists "corrections_select_own" on public.corrections;
  create policy "corrections_select_own"
    on public.corrections for select
    using (auth.uid() = user_id);

  drop policy if exists "corrections_insert_own" on public.corrections;
  create policy "corrections_insert_own"
    on public.corrections for insert
    with check (auth.uid() = user_id);

  -- ------------------------------------------------------------
  -- Competencies
  -- ------------------------------------------------------------
  create table if not exists public.competencies (
    id uuid primary key default gen_random_uuid(),
    correction_id uuid not null references public.corrections (id) on delete cascade,
    competency_id text not null check (competency_id in ('c1', 'c2', 'c3', 'c4', 'c5')),
    score integer not null,
    feedback text not null,
    unique (correction_id, competency_id)
  );

  create index if not exists competencies_correction_id_idx on public.competencies (correction_id);

  alter table public.competencies enable row level security;

  drop policy if exists "competencies_select_own" on public.competencies;
  create policy "competencies_select_own"
    on public.competencies for select
    using (
      exists (
        select 1
        from public.corrections c
        where c.id = correction_id
          and c.user_id = auth.uid()
      )
    );

  drop policy if exists "competencies_insert_own" on public.competencies;
  create policy "competencies_insert_own"
    on public.competencies for insert
    with check (
      exists (
        select 1
        from public.corrections c
        where c.id = correction_id
          and c.user_id = auth.uid()
      )
    );

  -- ------------------------------------------------------------
  -- Monthly Usage
  -- ------------------------------------------------------------
  create table if not exists public.monthly_usage (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    month text not null,
    used integer not null default 0,
    updated_at timestamptz not null default now(),
    unique (user_id, month)
  );

  alter table public.monthly_usage enable row level security;

  drop policy if exists "monthly_usage_select_own" on public.monthly_usage;
  create policy "monthly_usage_select_own"
    on public.monthly_usage for select
    using (auth.uid() = user_id);

  drop policy if exists "monthly_usage_insert_own" on public.monthly_usage;
  create policy "monthly_usage_insert_own"
    on public.monthly_usage for insert
    with check (auth.uid() = user_id);

  drop policy if exists "monthly_usage_update_own" on public.monthly_usage;
  create policy "monthly_usage_update_own"
    on public.monthly_usage for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

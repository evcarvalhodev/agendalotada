-- Produtos
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  price integer not null, -- em centavos
  active boolean default true,
  created_at timestamp with time zone default now()
);

-- Compras
create table public.purchases (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  product_id uuid references public.products(id),
  payment_id text unique,
  status text not null default 'pending', -- pending | paid | refunded
  created_at timestamp with time zone default now()
);

-- Tentativas de checkout (para email de abandono)
create table public.checkout_attempts (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  product_id uuid references public.products(id),
  email_sent boolean default false,
  created_at timestamp with time zone default now()
);

-- Perfis de usuário
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  is_admin boolean default false,
  activated boolean default false,
  created_at timestamp with time zone default now()
);

-- Módulos
create table public.modules (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id),
  title text not null,
  "order" integer not null default 0
);

-- Aulas
create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references public.modules(id),
  title text not null,
  youtube_id text not null,
  "order" integer not null default 0
);

-- RLS
alter table public.purchases enable row level security;
alter table public.profiles enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;

-- Policies
create policy "Usuário vê próprio perfil" on public.profiles
  for select using (auth.uid() = id);

create policy "Admin vê tudo" on public.profiles
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Usuário ativado vê módulos" on public.modules
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and activated = true)
  );

create policy "Usuário ativado vê aulas" on public.lessons
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and activated = true)
  );

-- Trigger para criar perfil ao registrar
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Produto inicial
insert into public.products (slug, name, price)
values ('kit-esteticistas', 'Kit Completo de Campanha para Esteticistas', 9700);

-- Jalankan sekali dalam SQL Editor projek Supabase baharu.
-- Ganti UUID contoh di bawah dengan User UID akaun admin (Authentication > Users).
create table public.experiments (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) between 1 and 150),
  board text not null,
  category text not null,
  description text not null default '',
  filename text not null default 'Sketch.ino',
  code text not null,
  published boolean not null default false,
  updated_at timestamptz not null default now()
);
create function public.is_smartlab_admin() returns boolean
language sql stable security invoker set search_path = '' as $$
  select coalesce((select auth.uid()) = 'e4603419-deba-45ed-8df9-d93304393ddf'::uuid, false);
$$;
revoke all on function public.is_smartlab_admin() from public;
grant execute on function public.is_smartlab_admin() to authenticated;
alter table public.experiments enable row level security;
revoke all on public.experiments from anon, authenticated;
grant select on public.experiments to anon, authenticated;
grant insert, update, delete on public.experiments to authenticated;
create policy "Public can read published" on public.experiments for select to anon, authenticated using (published);
create policy "Admin can manage all" on public.experiments for all to authenticated using (public.is_smartlab_admin()) with check (public.is_smartlab_admin());
insert into public.experiments(title,board,category,description,filename,code,published)
values ('LED Blinking','Arduino UNO','LED','LED onboard berkelip setiap satu saat.','LED_Blink.ino',$code$void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}$code$,true);

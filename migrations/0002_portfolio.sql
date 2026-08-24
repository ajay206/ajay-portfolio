create table if not exists portfolio_entries (
  id serial primary key,
  kind text not null,
  payload text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_entries_kind_idx
  on portfolio_entries (kind);

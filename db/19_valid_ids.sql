drop table if exists valid_ids cascade;

create table valid_ids (
    id integer primary key generated always as identity,
    id_code varchar(50) not null,
    id_description text not null,
    issued_by text not null,
    created_by integer not null references users (user_id),
    created_at timestamptz not null default now(),
    updated_by integer null references users (user_id),
    updated_at timestamptz null
);
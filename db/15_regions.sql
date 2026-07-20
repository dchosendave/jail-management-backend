drop table if exists regions cascade;

create table regions (
    region_id integer primary key generated always as identity,
    psgc_code varchar(255) not null,
    region_code varchar(10) not null,
    region_description text not null,
    created_by integer not null references users (user_id),
    created_at timestamptz not null default now(),
    updated_by integer null references users (user_id),
    updated_at timestamptz null
);

-- insert into regions (psgc_code, region_description, region_code, created_by, created_at)
-- values
--     ('', '', '', 1, now()),
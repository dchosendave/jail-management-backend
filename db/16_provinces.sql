drop table if exists provinces cascade;

create table provinces (
    province_id integer primary key generated always as identity,
    region_id integer not null references regions (region_id), -- fk from regions
    psgc_code varchar(255) not null,
    province_code varchar(10) not null,
    province_description text not null,
    created_by integer not null references users (user_id),
    created_at timestamptz not null default now(),
    updated_by integer null references users (user_id),
    updated_at timestamptz null
);

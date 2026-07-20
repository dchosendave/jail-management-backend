drop table if exists cities_municipalities cascade;

create table cities_municipalities (
    city_municipality_id integer primary key generated always as identity,
    region_id integer not null references regions (region_id), -- fk from regions
    province_id integer not null references provinces (province_id), -- fk from provinces
    psgc_code varchar(255) not null,
    city_municipality_code varchar(10) not null,
    city_municipality_description text not null,
    created_by integer not null references users (user_id),
    created_at timestamptz not null default now(),
    updated_by integer null references users (user_id),
    updated_at timestamptz null
);

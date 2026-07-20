drop table if exists barangays cascade;

create table barangays (
    barangay_id integer primary key generated always as identity,
    region_id integer not null references regions (region_id), -- fk from regions
    province_id integer not null references provinces (province_id), -- fk from provinces
    city_municipality_id integer not null references cities_municipalities (city_municipality_id),
    psgc_code varchar(255) not null,
    barangay_code varchar(10) not null,
    barangay_description text not null,
    created_by integer not null references users (user_id),
    created_at timestamptz not null default now(),
    updated_by integer null references users (user_id),
    updated_at timestamptz null
);

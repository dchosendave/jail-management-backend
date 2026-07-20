DROP TABLE IF EXISTS countries cascade; 

CREATE TABLE countries (
    country_id              INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    country_code    VARCHAR(10) NOT NULL,
    country_name    VARCHAR(255) NOT NULL,
    official_name   VARCHAR(255) NOT NULL,
    native_name varchar(255) not null,
    capital_city varchar(255) not null,
    region varchar(50) not null,
    sub_region varchar(50) not null,
    iso_code_2      VARCHAR(2) NOT NULL,
    iso_code_3 VARCHAR(3) not null,
    currency_code varchar(3) not null,
    phone_code varchar(10) not null,
    created_by integer not null references users (user_id),
    created_at timestamptz not null default now(),
    updated_by integer null references users (user_id),
    updated_at timestamptz null
);

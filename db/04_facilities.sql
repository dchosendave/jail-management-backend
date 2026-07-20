drop table if exists facilities cascade;

CREATE TABLE facilities (
    facility_id             INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    facility_name           VARCHAR(150) NOT NULL,
    type                    VARCHAR(50) NOT NULL,
    capacity                INTEGER NOT NULL,
    address_line            VARCHAR(255),
    region_id               INTEGER NOT NULL,
    province_id             INTEGER NOT NULL,
    city_municipality_id    INTEGER NOT NULL,
    barangay_id             INTEGER NOT NULL,
    contact_number          VARCHAR(30),
    status                  BOOLEAN NOT NULL DEFAULT TRUE,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by              INTEGER NOT NULL,
    updated_at              TIMESTAMPTZ,
    updated_by              INTEGER,

    CONSTRAINT fk_facilities_created_by  FOREIGN KEY (created_by) REFERENCES users (user_id),
    CONSTRAINT fk_facilities_updated_by  FOREIGN KEY (updated_by) REFERENCES users (user_id)
);

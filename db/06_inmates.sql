drop table if exists inmates cascade;

CREATE TABLE inmates (
    inmate_id               INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    inmate_number           VARCHAR(20) NOT NULL,
    first_name              VARCHAR(60) NOT NULL,
    middle_name             VARCHAR(60),
    last_name               VARCHAR(60) NOT NULL,
    suffix                  VARCHAR(10),
    alias                   VARCHAR(100),
    sex                     VARCHAR(10) NOT NULL,
    civil_status            VARCHAR(20),
    date_of_birth           DATE NOT NULL,
    place_of_birth          VARCHAR(150),
    nationality             VARCHAR(50) DEFAULT 'filipino',
    religion                VARCHAR(50),
    educational_attainment  VARCHAR(50),
    occupation              VARCHAR(100),
    emergency_contact_name  VARCHAR(150),
    emergency_contact_number VARCHAR(30),
    identifying_marks       TEXT,
    height_in_cm            NUMERIC(5,1),
    weight_in_kg            NUMERIC(5,1),
    blood_type              VARCHAR(5),
    status                  VARCHAR(20) NOT NULL DEFAULT 'detained',
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by              INTEGER NOT NULL,
    updated_at              TIMESTAMPTZ,
    updated_by              INTEGER,

    CONSTRAINT uq_inmates_inmate_number UNIQUE (inmate_number),
    CONSTRAINT fk_inmates_created_by    FOREIGN KEY (created_by) REFERENCES users (user_id),
    CONSTRAINT fk_inmates_updated_by    FOREIGN KEY (updated_by) REFERENCES users (user_id)
);

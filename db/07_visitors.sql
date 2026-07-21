drop table if exists visitors cascade;

CREATE TABLE visitors (
    visitor_id      INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name      VARCHAR(60) NOT NULL,
    middle_name     VARCHAR(60),
    last_name       VARCHAR(60) NOT NULL,
    suffix          VARCHAR(10),
    relationship    VARCHAR(30) NOT NULL,
    contact_number  VARCHAR(30),
    valid_id_type   VARCHAR(30) NOT NULL,
    valid_id_number VARCHAR(50),
    verified_at     TIMESTAMPTZ,
    verified_by     INTEGER NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      INTEGER NOT NULL,
    updated_at      TIMESTAMPTZ,
    updated_by      INTEGER,

    CONSTRAINT fk_visitors_verified_by  FOREIGN KEY (verified_by) REFERENCES personnel (personnel_id),
    CONSTRAINT fk_visitors_created_by   FOREIGN KEY (created_by)  REFERENCES personnel (personnel_id),
    CONSTRAINT fk_visitors_updated_by   FOREIGN KEY (updated_by)
      REFERENCES personnel (personnel_id)
);

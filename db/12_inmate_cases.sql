CREATE TABLE inmate_cases (
    inmate_case_id  INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    inmate_id       INTEGER NOT NULL,
    case_id         INTEGER NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      INTEGER NOT NULL,
    updated_at      TIMESTAMPTZ,
    updated_by      INTEGER,

    CONSTRAINT uq_inmate_cases_inmate_case   UNIQUE (inmate_id, case_id),
    CONSTRAINT fk_inmate_cases_inmate        FOREIGN KEY (inmate_id)   REFERENCES inmates (inmate_id),
    CONSTRAINT fk_inmate_cases_case          FOREIGN KEY (case_id)     REFERENCES cases (case_id),
    CONSTRAINT fk_inmate_cases_created_by    FOREIGN KEY (created_by)  REFERENCES users (user_id),
    CONSTRAINT fk_inmate_cases_updated_by    FOREIGN KEY (updated_by)  REFERENCES users (user_id)
);

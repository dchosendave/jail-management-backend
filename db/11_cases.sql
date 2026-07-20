drop table if exists cases cascade;


CREATE TABLE cases (
    case_id             INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    case_number         VARCHAR(50) NOT NULL,
    case_title          VARCHAR(200),
    committing_court_id INTEGER NOT NULL,
    offense_charged     VARCHAR(255) NOT NULL,
    offense_category    VARCHAR(50),
    status              VARCHAR(30) NOT NULL DEFAULT 'pending',
    date_filed          DATE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by          INTEGER NOT NULL,
    updated_at          TIMESTAMPTZ,
    updated_by          INTEGER,

    CONSTRAINT uq_cases_case_number            UNIQUE (case_number),
    CONSTRAINT fk_cases_committing_court       FOREIGN KEY (committing_court_id) REFERENCES committing_courts (committing_court_id),
    CONSTRAINT fk_cases_created_by             FOREIGN KEY (created_by)          REFERENCES users (user_id),
    CONSTRAINT fk_cases_updated_by             FOREIGN KEY (updated_by)          REFERENCES users (user_id)
);

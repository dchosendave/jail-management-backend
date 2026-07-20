CREATE TABLE committing_courts (
    committing_court_id     INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    committing_court_name   VARCHAR(150) NOT NULL,
    branch                  VARCHAR(50),
    type                    VARCHAR(30) NOT NULL,
    address                 VARCHAR(255),
    status                  VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by              INTEGER NOT NULL,
    updated_at              TIMESTAMPTZ,
    updated_by              INTEGER,

    CONSTRAINT fk_committing_courts_created_by  FOREIGN KEY (created_by) REFERENCES users (user_id),
    CONSTRAINT fk_committing_courts_updated_by  FOREIGN KEY (updated_by) REFERENCES users (user_id)
);

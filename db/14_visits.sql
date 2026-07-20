drop table if exists visits cascade;

CREATE TABLE visits (
    visit_id            INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    inmate_id           INTEGER NOT NULL,
    visitor_id          INTEGER NOT NULL,
    visit_date          DATE NOT NULL,
    time_in             TIME,
    time_out            TIME,
    purpose             VARCHAR(100),
    items_brought       TEXT,
    officer_on_duty_id  INTEGER NOT NULL,
    remarks             TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by          INTEGER NOT NULL,
    updated_at          TIMESTAMPTZ,
    updated_by          INTEGER,

    CONSTRAINT fk_visits_inmate            FOREIGN KEY (inmate_id)          REFERENCES inmates (inmate_id),
    CONSTRAINT fk_visits_visitor           FOREIGN KEY (visitor_id)         REFERENCES visitors (visitor_id),
    CONSTRAINT fk_visits_officer_on_duty   FOREIGN KEY (officer_on_duty_id) REFERENCES users (user_id),
    CONSTRAINT fk_visits_created_by        FOREIGN KEY (created_by)         REFERENCES users (user_id),
    CONSTRAINT fk_visits_updated_by        FOREIGN KEY (updated_by)         REFERENCES users (user_id)
);

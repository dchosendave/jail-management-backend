CREATE TABLE cells (
    cell_id     INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    facility_id INTEGER NOT NULL,
    cell_name   VARCHAR(150) NOT NULL,
    type        VARCHAR(30) NOT NULL,
    capacity    INTEGER NOT NULL,
    status      VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by  INTEGER NOT NULL,
    updated_at  TIMESTAMPTZ,
    updated_by  INTEGER,

    CONSTRAINT fk_cells_facility     FOREIGN KEY (facility_id) REFERENCES facilities (facility_id),
    CONSTRAINT fk_cells_created_by   FOREIGN KEY (created_by)  REFERENCES users (user_id),
    CONSTRAINT fk_cells_updated_by   FOREIGN KEY (updated_by)  REFERENCES users (user_id)
);

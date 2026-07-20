drop table if exists cell_assignments cascade;

CREATE TABLE cell_assignments (
    cell_assignment_id  INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    inmate_id           INTEGER NOT NULL,
    cell_id             INTEGER NOT NULL,
    assigned_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    assigned_by         INTEGER NOT NULL,
    reassigned_at       TIMESTAMPTZ,
    reassigned_by       INTEGER,

    CONSTRAINT fk_cell_assignments_inmate       FOREIGN KEY (inmate_id)     REFERENCES inmates (inmate_id),
    CONSTRAINT fk_cell_assignments_cell         FOREIGN KEY (cell_id)       REFERENCES cells (cell_id),
    CONSTRAINT fk_cell_assignments_assigned     FOREIGN KEY (assigned_by)   REFERENCES users (user_id),
    CONSTRAINT fk_cell_assignments_reassigned   FOREIGN KEY (reassigned_by) REFERENCES users (user_id)
);

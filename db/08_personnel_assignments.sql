drop table if exists personnel_assignments cascade;

CREATE TABLE personnel_assignments (
    personnel_assignment_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    personnel_id            INTEGER NOT NULL,
    facility_id             INTEGER NOT NULL,
    assigned_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    assigned_by             INTEGER NOT NULL,
    relieved_at             TIMESTAMPTZ,
    relieved_by             INTEGER,

    CONSTRAINT fk_personnel_assignments_personnel FOREIGN KEY (personnel_id) REFERENCES personnel (personnel_id),
    CONSTRAINT fk_personnel_assignments_facility  FOREIGN KEY (facility_id)  REFERENCES facilities (facility_id),
    CONSTRAINT fk_personnel_assignments_assigned  FOREIGN KEY (assigned_by)  REFERENCES users (user_id),
    CONSTRAINT fk_personnel_assignments_relieved  FOREIGN KEY (relieved_by)  REFERENCES users (user_id)
);

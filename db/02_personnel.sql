drop table if exists personnel cascade;

CREATE TABLE personnel (
    personnel_id    INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer null,
    employee_number VARCHAR(30) NOT NULL,
    first_name      VARCHAR(60) NOT NULL,
    middle_name     VARCHAR(60),
    last_name       VARCHAR(60) NOT NULL,
    suffix          VARCHAR(10),
    rank            VARCHAR(50),
    designation     VARCHAR(100),
    badge_number    VARCHAR(20) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    contact_number  VARCHAR(30),
    date_of_birth   DATE NOT NULL,
    date_hired      DATE NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      INTEGER NOT NULL,
    updated_at      TIMESTAMPTZ,
    updated_by      INTEGER,

    CONSTRAINT uq_personnel_employee_number UNIQUE (employee_number),
    CONSTRAINT uq_personnel_badge_number    UNIQUE (badge_number),
    CONSTRAINT uq_personnel_email           UNIQUE (email),
    CONSTRAINT uq_personnel_user_id unique (user_id)
);

INSERT INTO personnel (employee_number, first_name, middle_name, last_name, suffix,
                       rank, designation, badge_number, email, contact_number,
                       date_of_birth, date_hired, status, created_by)
VALUES ('ICTG0001',
        'LOWIE DAVE',
        'TEJARES',
        'DICHOSON',
        NULL,
        'SOFTWARE ENGINEER',
        'COURTS & JUSTICE',
        'N/A',
        'lowiedave30@gmail.com',
        '+639150833518',
        '2000-10-30',
        '2026-07-27',
        'ACTIVE',
        1);

-- Note: created_by and updated_by reference users.user_id, but the users table
-- is defined later due to a circular dependency (users.personnel_id → personnel).
-- The FK constraints are added at the bottom of 06_users.sql.
-- Run that file BEFORE applying these ALTER statements manually, or
-- let 06_users.sql handle it automatically when run in order.

-- =============================================================================
-- Jail Management System — Full Schema
-- Drops existing tables, then recreates everything.
-- Safe to run repeatedly (idempotent).
-- Run this entire file once in pgAdmin 4.
-- =============================================================================
-- DROP order: reverse dependency (children before parents)
-- =============================================================================

DROP TABLE IF EXISTS visits               CASCADE;
DROP TABLE IF EXISTS bookings             CASCADE;
DROP TABLE IF EXISTS inmate_cases         CASCADE;
DROP TABLE IF EXISTS cases                CASCADE;
DROP TABLE IF EXISTS cell_assignments     CASCADE;
DROP TABLE IF EXISTS cells                CASCADE;
DROP TABLE IF EXISTS personnel_assignments CASCADE;
DROP TABLE IF EXISTS visitors             CASCADE;
DROP TABLE IF EXISTS inmates              CASCADE;
DROP TABLE IF EXISTS committing_courts    CASCADE;
DROP TABLE IF EXISTS facilities           CASCADE;
DROP TABLE IF EXISTS users                CASCADE;
DROP TABLE IF EXISTS personnel            CASCADE;
DROP TABLE IF EXISTS countries            CASCADE;

-- =============================================================================
-- CREATE order: dependency-safe (parents before children)
-- =============================================================================

-- 01. countries — no dependencies
CREATE TABLE countries (
    id              INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    country_code    VARCHAR(10) NOT NULL,
    country_name    VARCHAR(255) NOT NULL,
    official_name   VARCHAR(255) NOT NULL,
    iso_code_2      VARCHAR(2)
);

-- 02. personnel — circular FK to users (deferred; added via ALTER in step 03)
CREATE TABLE personnel (
    personnel_id    INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
    CONSTRAINT uq_personnel_email           UNIQUE (email)
);

-- 03. users — FK to personnel; also adds circular FKs back to personnel
CREATE TABLE users (
    user_id         INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    personnel_id    INTEGER NOT NULL,
    email           VARCHAR(255) NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'active',
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      INTEGER NOT NULL,
    updated_at      TIMESTAMPTZ,
    updated_by      INTEGER,

    CONSTRAINT uq_users_personnel_id    UNIQUE (personnel_id),
    CONSTRAINT uq_users_email            UNIQUE (email),
    CONSTRAINT fk_users_personnel_id     FOREIGN KEY (personnel_id) REFERENCES personnel (personnel_id),
    CONSTRAINT fk_users_created_by       FOREIGN KEY (created_by)   REFERENCES users (user_id),
    CONSTRAINT fk_users_updated_by       FOREIGN KEY (updated_by)   REFERENCES users (user_id)
);

-- Add the circular FK constraints on personnel now that users exists
ALTER TABLE personnel
    ADD CONSTRAINT fk_personnel_created_by
    FOREIGN KEY (created_by) REFERENCES users (user_id);

ALTER TABLE personnel
    ADD CONSTRAINT fk_personnel_updated_by
    FOREIGN KEY (updated_by) REFERENCES users (user_id);

-- 04. facilities — depends on users
CREATE TABLE facilities (
    facility_id             INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    facility_name           VARCHAR(150) NOT NULL,
    type                    VARCHAR(50) NOT NULL,
    capacity                INTEGER NOT NULL,
    address_line            VARCHAR(255),
    region_id               INTEGER NOT NULL,
    province_id             INTEGER NOT NULL,
    city_municipality_id    INTEGER NOT NULL,
    barangay_id             INTEGER NOT NULL,
    contact_number          VARCHAR(30),
    status                  BOOLEAN NOT NULL DEFAULT TRUE,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by              INTEGER NOT NULL,
    updated_at              TIMESTAMPTZ,
    updated_by              INTEGER,

    CONSTRAINT fk_facilities_created_by  FOREIGN KEY (created_by) REFERENCES users (user_id),
    CONSTRAINT fk_facilities_updated_by  FOREIGN KEY (updated_by) REFERENCES users (user_id)
);

-- 05. committing_courts — depends on users
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

-- 06. inmates — depends on users
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

-- 07. visitors — depends on personnel
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
    CONSTRAINT fk_visitors_updated_by   FOREIGN KEY (updated_by)  REFERENCES personnel (personnel_id)
);

-- 08. personnel_assignments — depends on personnel, facilities, users
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

-- 09. cells — depends on facilities, users
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

-- 10. cell_assignments — depends on inmates, cells, users
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

-- 11. cases — depends on committing_courts, users
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

-- 12. inmate_cases — depends on inmates, cases, users
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

-- 13. bookings — depends on inmates, facilities, committing_courts, personnel, users
CREATE TABLE bookings (
    booking_id              INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    inmate_id               INTEGER NOT NULL,
    facility_id             INTEGER NOT NULL,
    booking_number          VARCHAR(30) NOT NULL,
    booking_date            DATE NOT NULL,
    booking_time            TIME,
    arresting_agency        VARCHAR(100),
    arresting_officer       VARCHAR(100),
    arresting_officer_rank  VARCHAR(50),
    arrest_location         VARCHAR(150),
    time_of_arrest          TIMESTAMPTZ,
    committing_court_id     INTEGER NOT NULL,
    committ_order_number    VARCHAR(50),
    committment_order_date  DATE,
    offense_commited        VARCHAR(255) NOT NULL,
    offense_category        VARCHAR(50),
    receiving_officer_id    INTEGER NOT NULL,
    status                  VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by              INTEGER NOT NULL,
    updated_at              TIMESTAMPTZ,
    updated_by              INTEGER,

    CONSTRAINT uq_bookings_booking_number           UNIQUE (booking_number),
    CONSTRAINT fk_bookings_inmate                   FOREIGN KEY (inmate_id)            REFERENCES inmates (inmate_id),
    CONSTRAINT fk_bookings_facility                 FOREIGN KEY (facility_id)          REFERENCES facilities (facility_id),
    CONSTRAINT fk_bookings_committing_court         FOREIGN KEY (committing_court_id)  REFERENCES committing_courts (committing_court_id),
    CONSTRAINT fk_bookings_receiving_officer        FOREIGN KEY (receiving_officer_id) REFERENCES personnel (personnel_id),
    CONSTRAINT fk_bookings_created_by               FOREIGN KEY (created_by)           REFERENCES users (user_id),
    CONSTRAINT fk_bookings_updated_by               FOREIGN KEY (updated_by)           REFERENCES users (user_id)
);

-- 14. visits — depends on inmates, visitors, users
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

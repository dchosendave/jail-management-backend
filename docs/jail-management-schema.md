# Jail Management — Database Schema

## Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────────┐       ┌─────────────────────┐
│  facilities  │       │      cells       │       │   cell_assignments  │
│              │ 1───M │                  │ 1───M │                     │
│ id           │       │ id               │       │ id                  │
│ name         │       │ facility_id (FK) │       │ inmate_id (FK)      │
│ type         │       │ name             │       │ cell_id (FK)        │
│ capacity     │       │ capacity         │       │ assigned_at         │
│ address      │       │ status           │       │ reassigned_at       │
│ region_id    │       └──────────────────┘       └──────────┬──────────┘
└──────┬───────┘                                              │
       │                                                     │
       │  ┌──────────────────┐                               │
       │  │personnel_assign..│                               │
       │  │                  │                               │
       │  │ personnel_id(FK) │                               │
       │  │ facility_id (FK) │                               │
       │  │ assigned_at      │                               │
       │  └────────┬─────────┘                               │
       │           │                                         │
┌──────┴───────────┴──────┐                    ┌─────────────┴──────────┐
│      personnel          │                    │        inmates          │
│                         │                    │                         │
│ id                      │                    │ id                      │
│ first_name              │                    │ inmate_number           │
│ last_name               │                    │ first_name              │
│ rank                    │                    │ last_name               │
│ badge_number            │                    │ alias                   │
│ email                   │                    │ sex                     │
│ status                  │                    │ date_of_birth           │
└─────────────────────────┘                    │ status                  │
                                               └──┬──┬──┬──┬────────────┘
                                                  │  │  │  │
                    ┌─────────────────────────────┘  │  │  └──────────────┐
                    ▼                                │  │                 ▼
          ┌──────────────────┐                       │  │     ┌──────────────────┐
          │     bookings     │                       │  │     │    attachments   │
          │                  │                       │  │     │                  │
          │ id               │                       │  │     │ id               │
          │ inmate_id  (FK)  │                       │  │     │ entity_type      │
          │ facility_id (FK) │                       │  │     │ entity_id        │
          │ booking_number   │                       │  │     │ file_name        │
          │ booking_date     │                       │  │     │ file_path        │
          │ arresting_agency │                       │  │     │ uploaded_by(FK)  │
          │ committing_court │                       │  │     └──────────────────┘
          │ offense          │                       │  │
          └────────┬─────────┘                       │  │
                   │                                 │  │
                   │  ┌──────────────────┐           │  │
                   │  │ committing_courts│           │  │
                   │  │                  │           │  │
                   │  │ id               │           │  │
                   │  │ name             │           │  │
                   │  │ branch           │           │  │
                   │  │ type             │           │  │
                   │  └──────────────────┘           │  │
                   │                                 │  │
     ┌─────────────┼─────────────────────────────────┘  │
     │             │                                    │
     ▼             ▼                                    ▼
┌──────────┐  ┌───────────────┐              ┌──────────────────┐
│  cases   │  │inmate_cases   │              │      visits      │
│          │  │               │              │                  │
│ id       │  │ inmate_id(FK) │              │ id               │
│ case_#   │  │ case_id  (FK) │              │ inmate_id  (FK)  │
│ court_id │  └───────────────┘              │ visitor_id (FK)  │
│ offense  │                                 │ visit_date       │
│ status   │                                 │ time_in          │
└──────────┘                                 │ time_out         │
         │                                   │ officer_id (FK)  │
         │                                   └────────┬─────────┘
         │                                            │
         │                               ┌────────────┴─────────┐
         │                               │       visitors       │
         │                               │                      │
         │                               │ id                   │
         └───────► committing_courts     │ first_name           │
                                         │ last_name            │
                                         │ relationship         │
                                         │ contact_number       │
                                         └──────────────────────┘
```

---

## Table Definitions

### 1. `facilities` [x]
The jail/detention facility itself (e.g. "Makati City Jail — Male Dormitory").

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `name` | `varchar(150)` | NOT NULL | Facility name |
| `type` | `varchar(50)` | NOT NULL | `city_jail`, `municipal_jail`, `district_jail`, `female_dormitory` |
| `capacity` | `integer` | NOT NULL | Maximum inmate capacity |
| `address_line` | `varchar(255)` | | Street address |
| `region_id` | `integer` | FK → regions | Region |
| `province_id` | `integer` | FK → provinces | Province |
| `city_municipality_id` | `integer` | FK → cities_municipalities | City/Municipality |
| `barangay_id` | `integer` | FK → barangays | Barangay |
| `contact_number` | `varchar(30)` | | Contact number |
| `status` | `varchar(20)` | NOT NULL, DEFAULT `'active'` | `active`, `inactive` |
| `created_at` | `timestamptz` | DEFAULT now() | — |
| `updated_at` | `timestamptz` | DEFAULT now() | — |

### 2. `cells` [x]
A housing unit (cell, dormitory, or isolation) within a facility.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `facility_id` | `integer` | FK → facilities | Parent facility |
| `name` | `varchar(100)` | NOT NULL | E.g. "Dormitory A", "Cell 5", "Isolation 1" |
| `type` | `varchar(30)` | NOT NULL | `cell`, `dormitory`, `isolation`, `infirmary` |
| `capacity` | `integer` | NOT NULL | Max occupants |
| `status` | `varchar(20)` | NOT NULL, DEFAULT `'active'` | `active`, `under_maintenance`, `closed` |

### 3. `inmates` [x]
The person deprived of liberty (PDL) — master record.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `inmate_number` | `varchar(20)` | NOT NULL, UNIQUE | System-generated inmate ID |
| `first_name` | `varchar(60)` | NOT NULL | Given name |
| `middle_name` | `varchar(60)` | | Middle name |
| `last_name` | `varchar(60)` | NOT NULL | Surname |
| `suffix` | `varchar(10)` | | Jr, Sr, III |
| `alias` | `varchar(100)` | | Also known as |
| `sex` | `varchar(10)` | NOT NULL | `male`, `female` |
| `civil_status` | `varchar(20)` | | `single`, `married`, `widowed`, `separated` |
| `date_of_birth` | `date` | NOT NULL | — |
| `place_of_birth` | `varchar(150)` | | — |
| `nationality` | `varchar(50)` | DEFAULT `'Filipino'` | — |
| `religion` | `varchar(50)` | | — |
| `educational_attainment` | `varchar(50)` | | — |
| `occupation` | `varchar(100)` | | Pre-detention occupation |
| `emergency_contact_name` | `varchar(150)` | | — |
| `emergency_contact_number` | `varchar(30)` | | — |
| `identifying_marks` | `text` | | Scars, tattoos, deformities |
| `height_cm` | `numeric(5,1)` | | Height in centimeters |
| `weight_kg` | `numeric(5,1)` | | Weight in kilograms |
| `blood_type` | `varchar(5)` | | A+, B-, O+, etc. |
| `status` | `varchar(20)` | NOT NULL, DEFAULT `'detained'` | `detained`, `released`, `transferred`, `deceased`, `escaped` |
| `created_at` | `timestamptz` | DEFAULT now() | — |
| `updated_at` | `timestamptz` | DEFAULT now() | — |

### 4. `cell_assignments` [x]
Tracks which cell an inmate is housed in (with history).

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `inmate_id` | `integer` | FK → inmates | The inmate |
| `cell_id` | `integer` | FK → cells | The cell |
| `assigned_at` | `timestamptz` | NOT NULL, DEFAULT now() | When assigned |
| `reassigned_at` | `timestamptz` | | When moved out (null = currently here) |

### 5. `personnel` [x]
Jail officers and non-uniformed personnel.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `employee_number` | `varchar(30)` | NOT NULL, UNIQUE | Personnel/employee ID |
| `first_name` | `varchar(60)` | NOT NULL | — |
| `middle_name` | `varchar(60)` | | — |
| `last_name` | `varchar(60)` | NOT NULL | — |
| `suffix` | `varchar(10)` | | — |
| `rank` | `varchar(50)` | NOT NULL | E.g. JO1, SJO4, JINSP |
| `designation` | `varchar(100)` | | E.g. Officer of the Day, Warden |
| `badge_number` | `varchar(20)` | UNIQUE | — |
| `email` | `varchar(255)` | UNIQUE | — |
| `contact_number` | `varchar(30)` | | — |
| `date_of_birth` | `date` | | — |
| `date_hired` | `date` | | — |
| `status` | `varchar(20)` | NOT NULL, DEFAULT `'active'` | `active`, `suspended`, `terminated`, `retired` |
| `created_at` | `timestamptz` | DEFAULT now() | — |
| `updated_at` | `timestamptz` | DEFAULT now() | — |

### 6. `personnel_assignments` [x]
Which facility an officer is assigned to (with history).

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `personnel_id` | `integer` | FK → personnel | The officer |
| `facility_id` | `integer` | FK → facilities | The facility |
| `assigned_at` | `timestamptz` | NOT NULL, DEFAULT now() | Start of assignment |
| `relieved_at` | `timestamptz` | | End of assignment (null = current) |

### 7. `bookings` [x]
Every time an inmate is admitted into the facility. One inmate can have multiple bookings over time (re-admissions).

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `inmate_id` | `integer` | FK → inmates, NOT NULL | The person admitted |
| `facility_id` | `integer` | FK → facilities, NOT NULL | Which facility |
| `booking_number` | `varchar(30)` | NOT NULL, UNIQUE | System-generated booking number |
| `booking_date` | `date` | NOT NULL | Date of admission |
| `booking_time` | `time` | | Time of admission |
| `arresting_agency` | `varchar(100)` | | E.g. PNP, NBI |
| `arresting_officer` | `varchar(100)` | | Name of arresting officer |
| `arresting_officer_rank` | `varchar(50)` | | — |
| `arrest_location` | `varchar(150)` | | Where the arrest took place |
| `time_of_arrest` | `timestamptz` | | When arrested |
| `committing_court_id` | `integer` | FK → committing_courts | Which court committed |
| `commitment_order_number` | `varchar(50)` | | Court order number |
| `commitment_order_date` | `date` | | Date of commitment order |
| `offense_committed` | `varchar(255)` | NOT NULL | The charge/offense cited |
| `offense_category` | `varchar(50)` | | `felony`, `misdemeanor`, `ordinance_violation` |
| `receiving_officer_id` | `integer` | FK → personnel | Which officer received the inmate |
| `status` | `varchar(20)` | NOT NULL, DEFAULT `'active'` | `active`, `released`, `transferred` |
| `created_at` | `timestamptz` | DEFAULT now() | — |

### 8. `committing_courts` [x]
Reference table for courts that issue commitment orders.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `name` | `varchar(150)` | NOT NULL | Court name |
| `branch` | `varchar(50)` | | Branch number |
| `type` | `varchar(30)` | NOT NULL | `rtc` (Regional Trial Court), `mtc`, `mctc`, `mtcc`, `sandiganbayan`, etc. |
| `city_municipality_id` | `integer` | FK → cities_municipalities | Location |
| `address` | `varchar(255)` | | — |

### 9. `cases` [x]
Criminal case records independent of inmates (one case can involve multiple PDLs).

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `case_number` | `varchar(50)` | NOT NULL, UNIQUE | E.g. "CRIM-2024-001234" |
| `case_title` | `varchar(200)` | | E.g. "People vs. Dela Cruz" |
| `committing_court_id` | `integer` | FK → committing_courts | Which court handles this case |
| `offense_charged` | `varchar(255)` | NOT NULL | The offense |
| `offense_category` | `varchar(50)` | | `felony`, `misdemeanor` |
| `status` | `varchar(30)` | NOT NULL, DEFAULT `'pending'` | `pending`, `ongoing`, `resolved`, `dismissed`, `archived` |
| `date_filed` | `date` | | When the case was filed |
| `created_at` | `timestamptz` | DEFAULT now() | — |
| `updated_at` | `timestamptz` | DEFAULT now() | — |

### 10. `inmate_cases` [x]
Join table linking inmates to cases (M:M).

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `inmate_id` | `integer` | FK → inmates, NOT NULL | — |
| `case_id` | `integer` | FK → cases, NOT NULL | — |
| `created_at` | `timestamptz` | DEFAULT now() | — |

UNIQUE constraint on `(inmate_id, case_id)`.

### 11. `visitors` [x]
People registered to visit inmates.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `first_name` | `varchar(60)` | NOT NULL | — |
| `middle_name` | `varchar(60)` | | — |
| `last_name` | `varchar(60)` | NOT NULL | — |
| `suffix` | `varchar(10)` | | — |
| `relationship` | `varchar(30)` | NOT NULL | E.g. `spouse`, `parent`, `sibling`, `counsel`, `friend` |
| `contact_number` | `varchar(30)` | | — |
| `valid_id_type` | `varchar(30)` | FK → valid_ids | Type of ID presented |
| `valid_id_number` | `varchar(50)` | | ID number |
| `verified_at` | `timestamptz` | | When the visitor was first verified |
| `status` | `varchar(20)` | NOT NULL, DEFAULT `'active'` | `active`, `banned` |
| `created_at` | `timestamptz` | DEFAULT now() | — |

### 12. `visits` [x]
Log of each visitation event.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `inmate_id` | `integer` | FK → inmates, NOT NULL | Who was visited |
| `visitor_id` | `integer` | FK → visitors, NOT NULL | Who visited |
| `visit_date` | `date` | NOT NULL | Date of visit |
| `time_in` | `time` | | When visitor entered |
| `time_out` | `time` | | When visitor left |
| `purpose` | `varchar(100)` | | Reason for visit |
| `items_brought` | `text` | | Items/gifts brought |
| `officer_on_duty_id` | `integer` | FK → personnel | Who supervised |
| `remarks` | `text` | | Notes |
| `created_at` | `timestamptz` | DEFAULT now() | — |

### 13. `attachments` [x]
Polymorphic file attachments. Can link to any entity.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `entity_type` | `varchar(30)` | NOT NULL | The table this file belongs to: `inmate`, `booking`, `case`, `personnel`, `visit` |
| `entity_id` | `integer` | NOT NULL | The ID of the entity |
| `file_name` | `varchar(255)` | NOT NULL | Original filename |
| `file_type` | `varchar(50)` | NOT NULL | MIME type |
| `file_size_bytes` | `integer` | NOT NULL | File size |
| `file_path` | `varchar(500)` | NOT NULL | Storage path |
| `description` | `varchar(255)` | | Optional description |
| `uploaded_by_id` | `integer` | FK → personnel | Who uploaded |
| `uploaded_at` | `timestamptz` | DEFAULT now() | — |

---

## Reference Tables

### `countries`, `regions`, `provinces`, `cities_municipalities`, `barangays`
Standard Philippine geographic hierarchy — already partially defined. Used by `facilities`, `committing_courts`, and potentially inmate address lookups.

### `valid_ids`
Government-issued ID types accepted for identification.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `name` | `varchar(100)` | NOT NULL | E.g. "UMID", "Passport", "Driver's License" |
| `abbreviation` | `varchar(10)` | | Short code |

### `security_questions`
For account recovery.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `question_text` | `varchar(255)` | NOT NULL | E.g. "What is your mother's maiden name?" |

---

## Auth Tables

### `users`
System user accounts (can be linked to a personnel record).

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `personnel_id` | `integer` | FK → personnel, UNIQUE | Link to officer record (nullable for admins) |
| `email` | `varchar(255)` | NOT NULL, UNIQUE | Login email |
| `password_hash` | `varchar(255)` | NOT NULL | Bcrypt hash |
| `status` | `varchar(20)` | NOT NULL, DEFAULT `'active'` | `active`, `locked`, `inactive` |
| `last_login_at` | `timestamptz` | | — |
| `created_at` | `timestamptz` | DEFAULT now() | — |
| `updated_at` | `timestamptz` | DEFAULT now() | — |

### `user_roles`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `user_id` | `integer` | FK → users | — |
| `role` | `varchar(30)` | NOT NULL | `admin`, `warden`, `desk_officer`, `guard`, `viewer` |

### `otp_challenges`
Stores OTP challenges for passwordless authentication.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `integer` | PK, identity | — |
| `user_id` | `integer` | FK → users | — |
| `challenge_token` | `uuid` | NOT NULL, UNIQUE | UUID sent to the client |
| `purpose` | `varchar(30)` | NOT NULL | `create_account`, `update_account`, `change_password` |
| `otp_hash` | `varchar(255)` | NOT NULL | Hashed OTP code |
| `resend_attempts` | `integer` | NOT NULL, DEFAULT 0 | Tracks resends |
| `max_resend_attempts` | `integer` | NOT NULL, DEFAULT 3 | — |
| `expires_at` | `timestamptz` | NOT NULL | — |
| `verified_at` | `timestamptz` | | Null until verified |
| `created_at` | `timestamptz` | DEFAULT now() | — |

---

## Indexes (recommended)

```sql
-- inmates: fast lookup and search
CREATE INDEX idx_inmates_inmate_number ON inmates(inmate_number);
CREATE INDEX idx_inmates_status ON inmates(status);
CREATE INDEX idx_inmates_name ON inmates(last_name, first_name);

-- bookings: lookup by inmate and date
CREATE INDEX idx_bookings_inmate_id ON bookings(inmate_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);

-- cases: searchable case number and status
CREATE INDEX idx_cases_case_number ON cases(case_number);
CREATE INDEX idx_cases_status ON cases(status);

-- visits: efficient visit history
CREATE INDEX idx_visits_inmate_id ON visits(inmate_id);
CREATE INDEX idx_visits_date ON visits(visit_date);

-- cell_assignments: current housing
CREATE INDEX idx_cell_assignments_inmate ON cell_assignments(inmate_id);
CREATE INDEX idx_cell_assignments_cell ON cell_assignments(cell_id);

-- attachments: polymorphic lookup
CREATE INDEX idx_attachments_entity ON attachments(entity_type, entity_id);
```

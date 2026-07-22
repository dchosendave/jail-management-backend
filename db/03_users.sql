drop table if exists users cascade;

CREATE TABLE users (
    user_id         INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email           VARCHAR(255) NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'active',
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      INTEGER NOT NULL default 1,
    updated_at      TIMESTAMPTZ,
    updated_by      INTEGER,

    CONSTRAINT uq_users_email            UNIQUE (email),
    CONSTRAINT fk_users_created_by       FOREIGN KEY (created_by)   REFERENCES users (user_id),
    CONSTRAINT fk_users_updated_by       FOREIGN KEY (updated_by)   REFERENCES users (user_id)
);

--Add the FKs on personnel.created_by / updated_by now that users exists.
ALTER TABLE personnel
    ADD CONSTRAINT fk_personnel_created_by
    FOREIGN KEY (created_by) REFERENCES users (user_id);

ALTER TABLE personnel
    ADD CONSTRAINT fk_personnel_updated_by
    FOREIGN KEY (updated_by) REFERENCES users (user_id);

ALTER TABLE personnel
    ADD CONSTRAINT fk_personnel_user_id
    FOREIGN KEY (user_id) REFERENCES users (user_id);
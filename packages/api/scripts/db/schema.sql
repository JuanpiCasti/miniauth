CREATE TABLE projects
(
    id              BIGINT GENERATED ALWAYS AS IDENTITY,
    user_id         BIGINT      NOT NULL,
    name            VARCHAR(50) NOT NULL,
    private_key     JSONB       NOT NULL,
    public_key      JSONB       NOT NULL,
    client_id       VARCHAR(50) NOT NULL,
    client_secret   VARCHAR(50) NOT NULL,
    expiration_mins INT         NOT NULL DEFAULT 5
);

CREATE INDEX client_id_secret_idx ON projects (client_id, client_secret);

ALTER TABLE projects
    ADD CONSTRAINT projects_pk PRIMARY KEY (id);
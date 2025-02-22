CREATE TABLE sponsors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE editais (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    funding_min DECIMAL(15,2),
    funding_max DECIMAL(15,2),
    sponsor_id INTEGER REFERENCES sponsors(id)
);

CREATE TABLE edital_sdgs (
    edital_id INTEGER REFERENCES editais(id),
    sdg INTEGER NOT NULL
);

CREATE TABLE edital_causes (
    edital_id INTEGER REFERENCES editais(id),
    cause INTEGER NOT NULL
);

CREATE TABLE edital_skills (
    edital_id INTEGER REFERENCES editais(id),
    skill INTEGER NOT NULL
);
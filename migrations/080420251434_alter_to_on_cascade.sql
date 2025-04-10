ALTER TABLE edital_sdgs
ADD CONSTRAINT fk_editais
FOREIGN KEY (edital_id)
REFERENCES editais(id)
ON DELETE CASCADE;

ALTER TABLE edital_causes
ADD CONSTRAINT fk_editais
FOREIGN KEY (edital_id)
REFERENCES editais(id)
ON DELETE CASCADE;

ALTER TABLE edital_skills
ADD CONSTRAINT fk_editais
FOREIGN KEY (edital_id)
REFERENCES editais(id)
ON DELETE CASCADE;


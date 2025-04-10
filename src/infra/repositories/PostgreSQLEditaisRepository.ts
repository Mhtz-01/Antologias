import { QueryResult } from "pg";
import pool from "../database";
import Edital from "@/domain/entities/edital";
import IEditaisRepository from "@/domain/entities/IEditaisRepository";

class PostgresEditaisRepository implements IEditaisRepository {
    async save(edital: Edital): Promise<Edital> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            const sponsorResult = await client.query(
                `INSERT INTO sponsors (name, icon_url, description, website, contact_email, phone)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (name) DO UPDATE SET 
                    icon_url = EXCLUDED.icon_url,
                    description = EXCLUDED.description,
                    website = EXCLUDED.website,
                    contact_email = EXCLUDED.contact_email,
                    phone = EXCLUDED.phone
                RETURNING id`,
                [
                    edital.sponsor.name,
                    edital.sponsor.icon_url,
                    edital.sponsor.description,
                    edital.sponsor.website,
                    edital.sponsor.contactEmail,
                    edital.sponsor.phone
                ]
            );
            const sponsor_id = sponsorResult.rows[0].id;

            const query = `
                INSERT INTO editais (
                    title, iconurl, description, funding_min, funding_max, sponsor_id, initial_date_time, end_date_time
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *;
            `;
            const values = [
                edital.title,
                edital.icon,
                edital.description,
                edital.funding_min,
                edital.funding_max,
                sponsor_id,
                edital.deadline.initial_time,
                edital.deadline.end_time
            ];

            const result: QueryResult<Edital> = await client.query(query, values);
            const createdEdital = result.rows[0];

            if (!createdEdital.id) {
                throw new Error("Failed to retrieve the generated ID for the edital.");
            }

            await Promise.all([
                this.insertRelations(client, "edital_sdgs", "sdg", createdEdital.id, edital.sdgs.map(s => s.id)),
                this.insertRelations(client, "edital_causes", "cause", createdEdital.id, edital.causes.map(c => c.id)),
                this.insertRelations(client, "edital_skills", "skill", createdEdital.id, edital.skills.map(s => s.id))
            ]);

            await client.query("COMMIT");
            return createdEdital;
        } catch (error) {
            await client.query("ROLLBACK");
            throw new Error("Erro ao salvar edital: " + error);
        } finally {
            client.release();
        }
    }

    private async insertRelations(client: any, table: string, field: string, editalId: number, values: number[]) {
        if (values.length > 0) {
            const query = `
                INSERT INTO ${table} (edital_id, ${field}) 
                VALUES ${values.map((_, index) => `($1, $${index + 2})`).join(', ')};
            `;
            await client.query(query, [editalId, ...values]);
        }
    }

    async findAll(): Promise<Edital[]> {
        const query = `
            SELECT 
                e.id, e.title, e.iconurl, e.description, e.funding_min, e.funding_max,
                e.initial_date_time AS start_of_submission,
                e.end_date_time AS end_of_submission,
                json_build_object(
                    'id', s.id,
                    'name', s.name,
                    'icon_url', s.icon_url,
                    'description', s.description,
                    'website', s.website,
                    'contactEmail', s.contact_email,
                    'phone', s.phone
                ) AS sponsor,
                ARRAY(SELECT json_build_object('id', sdg) FROM edital_sdgs WHERE edital_id = e.id) AS sdgs,
                ARRAY(SELECT json_build_object('id', cause) FROM edital_causes WHERE edital_id = e.id) AS causes,
                ARRAY(SELECT json_build_object('id', skill) FROM edital_skills WHERE edital_id = e.id) AS skills
            FROM editais e
            JOIN sponsors s ON e.sponsor_id = s.id;
        `;
        const result: QueryResult<Edital> = await pool.query(query);

        return result.rows.map(row => new Edital({
            ...row,
            deadline: {
                initial_time: row.,
                end_time: row.end_date_time
            }
        }));
    }

    async findByID(id: number): Promise<Edital> {
        const query = `
            SELECT 
                e.id, e.title, e.iconurl, e.description, e.funding_min, e.funding_max,
                e.initial_date_time AS start_of_submission,
                e.end_date_time AS end_of_submission,
                json_build_object(
                    'id', s.id,
                    'name', s.name,
                    'icon_url', s.icon_url,
                    'description', s.description,
                    'website', s.website,
                    'contactEmail', s.contact_email,
                    'phone', s.phone
                ) AS sponsor,
                ARRAY(SELECT json_build_object('id', sdg) FROM edital_sdgs WHERE edital_id = e.id) AS sdgs,
                ARRAY(SELECT json_build_object('id', cause) FROM edital_causes WHERE edital_id = e.id) AS causes,
                ARRAY(SELECT json_build_object('id', skill) FROM edital_skills WHERE edital_id = e.id) AS skills
            FROM editais e
            JOIN sponsors s ON e.sponsor_id = s.id
            WHERE e.id = $1;
        `;
        const result: QueryResult<Edital> = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            throw new Error("Não existe um edital com esse ID!");
        }

        const row = result.rows[0];
        return new Edital(
            row.id,
            row.title,
            row.icon,
            row.description,
            row.funding_min,
            row.funding_max,
            row.sponsor,
            row.sdgs,
            row.causes,
            row.skills,
            row.edital_url,
            row.deadline
        );
    }

    async updateByID(id: number, edital: Edital): Promise<Edital> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            const sponsorResult = await client.query(
                `INSERT INTO sponsors (name, icon_url, description, website, contact_email, phone)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (name) DO UPDATE SET 
                    icon_url = EXCLUDED.icon_url,
                    description = EXCLUDED.description,
                    website = EXCLUDED.website,
                    contact_email = EXCLUDED.contact_email,
                    phone = EXCLUDED.phone
                RETURNING id`,
                [
                    edital.sponsor.name,
                    edital.sponsor.icon_url,
                    edital.sponsor.description,
                    edital.sponsor.website,
                    edital.sponsor.contactEmail,
                    edital.sponsor.phone
                ]
            );
            const sponsor_id = sponsorResult.rows[0].id;

            const updateQuery = `
                UPDATE editais SET 
                    title = $1, iconurl = $2, description = $3, 
                    funding_min = $4, funding_max = $5, sponsor_id = $6,
                    initial_date_time = $7, end_date_time = $8
                WHERE id = $9 RETURNING *;
            `;
            const updateValues = [
                edital.title,
                edital.icon,
                edital.description,
                edital.funding_min,
                edital.funding_max,
                sponsor_id,
                edital.deadline.initial_time,
                edital.deadline.end_time,
                id
            ];
            const result: QueryResult<Edital> = await client.query(updateQuery, updateValues);

            await client.query("DELETE FROM edital_sdgs WHERE edital_id = $1", [id]);
            await client.query("DELETE FROM edital_causes WHERE edital_id = $1", [id]);
            await client.query("DELETE FROM edital_skills WHERE edital_id = $1", [id]);

            await this.insertRelations(client, "edital_sdgs", "sdg", id, edital.sdgs.map(s => s.id));
            await this.insertRelations(client, "edital_causes", "cause", id, edital.causes.map(c => c.id));
            await this.insertRelations(client, "edital_skills", "skill", id, edital.skills.map(s => s.id));

            await client.query("COMMIT");
            return result.rows[0];
        } catch (error) {
            await client.query("ROLLBACK");
            throw new Error("Erro ao atualizar edital: " + error);
        } finally {
            client.release();
        }
    }

    async delete(id: number): Promise<boolean> {
        const result = await pool.query("DELETE FROM editais WHERE id = $1", [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}

export default new PostgresEditaisRepository();

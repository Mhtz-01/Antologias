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
                `INSERT INTO sponsors (name)
                VALUES ($1)
                ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
                RETURNING id`,
                [edital.sponsor.name]
            );
            const sponsorId = sponsorResult.rows[0].id;

            const query = `
                INSERT INTO editais (title, IconUrl, description, funding_min, funding_max, sponsor_id)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
            `;
            const values = [
                edital.title,
                edital.icon,
                edital.description,
                edital.funding_min,
                edital.funding_max,
                sponsorId
            ];

            const result: QueryResult<Edital> = await client.query(query, values);
            const createdEdital = result.rows[0];

            if (!createdEdital.id) {
                throw new Error("Failed to retrieve the generated ID for the edital.");
            }

            console.log("Created Edital ID:", createdEdital.id);

            await Promise.all([
                this.insertRelations(client, "edital_sdgs", "sdg", createdEdital.id, edital.sdgs),
                this.insertRelations(client, "edital_causes", "cause", createdEdital.id, edital.causes),
                this.insertRelations(client, "edital_skills", "skill", createdEdital.id, edital.skills)
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

    private async insertRelations(client: any, table: string, field: string, editalId: number, values: any[]) {
        if (values.length > 0) {
            const query = `
            INSERT INTO ${table} (edital_id, ${field}) 
            VALUES ${values.map((_, index) => `($1, $${index + 2})`).join(', ')}
        `;
            await client.query(query, [editalId, ...values]);
        }
    }

    async findAll(): Promise<Edital[]> {
        const query = `
    SELECT 
        e.id, e.title, e.IconUrl, e.description, e.funding_min, e.funding_max, e.initial_date_time, e.end_date_time,
        s.name AS sponsor,
        ARRAY(SELECT sdg FROM edital_sdgs WHERE edital_id = e.id) AS sdgs,
        ARRAY(SELECT cause FROM edital_causes WHERE edital_id = e.id) AS causes,
        ARRAY(SELECT skill FROM edital_skills WHERE edital_id = e.id) AS skills
    FROM editais e
    JOIN sponsors s ON e.sponsor_id = s.id;
    `;

        const result: QueryResult<Edital> = await pool.query(query);
        return result.rows;
    }

    async findByID(id: number): Promise<Edital> {
        const query = `
    SELECT 
        e.id, e.title, e.IconUrl, e.description, e.funding_min, e.funding_max,
        s.name AS sponsor,
        ARRAY(SELECT sdg FROM edital_sdgs WHERE edital_id = e.id) AS sdgs,
        ARRAY(SELECT cause FROM edital_causes WHERE edital_id = e.id) AS causes,
        ARRAY(SELECT skill FROM edital_skills WHERE edital_id = e.id) AS skills
    FROM editais e
    JOIN sponsors s ON e.sponsor_id = s.id
    WHERE e.id = $1;
    `;

        const result: QueryResult<Edital> = await pool.query(query, [id]);
        if (result.rows.length === 0) throw new Error("Não existe um edital com esse ID!");
        return result.rows[0];
    }

    async updateByID(id: number, updatedEdital: Edital): Promise<Edital> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            const sponsorResult = await client.query(
                `INSERT INTO sponsors (name)
            VALUES ($1)
            ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
            RETURNING id`,
                [updatedEdital.sponsor.name]
            );
            const sponsorId = sponsorResult.rows[0].id;

            const query = `
            UPDATE editais SET 
            title = $1, IconUrl = $2, description = $3, 
            funding_min = $4, funding_max = $5, sponsor_id = $6
            WHERE id = $7 RETURNING *;
        `;
            const values = [
                updatedEdital.title, updatedEdital.icon, updatedEdital.description,
                updatedEdital.funding_min, updatedEdital.funding_max, sponsorId, id
            ];

            const result: QueryResult<Edital> = await client.query(query, values);

            await client.query("DELETE FROM edital_sdgs WHERE edital_id = $1", [id]);
            await client.query("DELETE FROM edital_causes WHERE edital_id = $1", [id]);
            await client.query("DELETE FROM edital_skills WHERE edital_id = $1", [id]);

            await this.insertRelations(client, "edital_sdgs", "sdg", id, updatedEdital.sdgs.map(sdg => sdg.id));
            await this.insertRelations(client, "edital_causes", "cause", id, updatedEdital.causes.map(cause => cause.id));
            await this.insertRelations(client, "edital_skills", "skill", id, updatedEdital.skills.map(skill => skill.id));

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

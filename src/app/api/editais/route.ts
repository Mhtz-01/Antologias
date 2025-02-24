import { NextResponse } from 'next/server';
import { Client } from 'pg';
import { z } from 'zod';

const EditalSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  funding_min: z.number().positive(),
  funding_max: z.number().positive(),
  sponsor: z.object({ name: z.string().min(3) }),
  sdgs: z.array(z.number().int().positive()).nonempty(),
  causes: z.array(z.number().int().positive()).nonempty(),
  skills: z.array(z.number().int().positive()).nonempty()
});

const client = new Client({
  connectionString: process.env.POSTGRES_URL
})

await client.connect();

// GET - Buscar todos os editais
export async function GET() {
  try {
    const editais = await client.query(` 
      SELECT 
        e.id,
        e.title,
        e.description,
        e.funding_min,
        e.funding_max,
        s.name AS sponsor_name,
        (
          SELECT array_agg(sdg) 
          FROM edital_sdgs 
          WHERE edital_id = e.id
        ) AS sdgs,
        (
          SELECT array_agg(cause) 
          FROM edital_causes 
          WHERE edital_id = e.id
        ) AS causes,
        (
          SELECT array_agg(skill) 
          FROM edital_skills 
          WHERE edital_id = e.id
        ) AS skills
      FROM editais e
      JOIN sponsors s ON e.sponsor_id = s.id
    `);

    return NextResponse.json(editais.rows);
  } catch (error) {
    console.error('Erro ao buscar editais:', error);
    return NextResponse.json({ error: 'Erro ao buscar editais' }, { status: 500 });
  }
}

// POST - Criar novo edital
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = EditalSchema.parse(body);

    // Insere ou busca patrocinador existente
    const sponsor = await client.query(`
      INSERT INTO sponsors (name)
      VALUES (${validatedData.sponsor.name})
      ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
      RETURNING id
    `);

    // Insere edital
    const edital = await client.query(`
      INSERT INTO editais (
        title, 
        description, 
        funding_min, 
        funding_max, 
        sponsor_id
      ) VALUES (
        ${validatedData.title},
        ${validatedData.description},
        ${validatedData.funding_min},
        ${validatedData.funding_max},
        ${sponsor.rows[0].id}
      ) RETURNING id
    `);

    const editalId = edital.rows[0].id;

    // Insere relacionamentos (SDGs, Causas, Skills)
    const insertRelations = async (table: string, field: string, values: number[]) => {
      if (values.length > 0) {
        console.log(`
          INSERT INTO ${table} (edital_id, ${field})
      VALUES ${values.map((_, index) => `($${1}, $${index + 2})`).join(',')}`,
    values)

        await client.query( `
          INSERT INTO ${table} (edital_id, ${field})
      VALUES ${values.map((_, index) => `($${1}, $${index + 2})`).join(',')}`,
      values);
      }
    };

    await Promise.all([
      insertRelations('edital_sdgs', 'sdg', validatedData.sdgs),
      insertRelations('edital_causes', 'cause', validatedData.causes),
      insertRelations('edital_skills', 'skill', validatedData.skills)
    ]);

    return NextResponse.json({ id: editalId, message: 'Edital criado com sucesso' }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar edital:', error);
    return NextResponse.json({ error: 'Dados inválidos ou erro no servidor' }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { z } from 'zod';

const EditalSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  funding_min: z.number().positive(),
  funding_max: z.number().positive(),
  sponsor: z.object({ name: z.string().min(3) }),
  sdgs: z.array(z.number().int().positive()),
  causes: z.array(z.number().int().positive()),
  skills: z.array(z.number().int().positive())
});

// GET Todos os Editais
export async function GET() {
  try {
    const editais = await sql`
      SELECT 
        e.id,
        e.title,
        e.description,
        e.funding_min,
        e.funding_max,
        s.name as sponsor_name,
        (
          SELECT array_agg(sdg) 
          FROM edital_sdgs 
          WHERE edital_id = e.id
        ) as sdgs,
        (
          SELECT array_agg(cause) 
          FROM edital_causes 
          WHERE edital_id = e.id
        ) as causes,
        (
          SELECT array_agg(skill) 
          FROM edital_skills 
          WHERE edital_id = e.id
        ) as skills
      FROM editais e
      JOIN sponsors s ON e.sponsor_id = s.id
    `;

    return NextResponse.json(editais.rows);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar editais' },
      { status: 500 }
    );
  }
}

// POST Criar Novo Edital
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = EditalSchema.parse(body);

    // Insere Patrocinador
    const sponsor = await sql`
      INSERT INTO sponsors (name)
      VALUES (${validatedData.sponsor.name})
      RETURNING id
    `;

    // Insere Edital
    const edital = await sql`
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
      ) RETURNING *
    `;

    // Insere Relacionamentos
    const editalId = edital.rows[0].id;

    await Promise.all([
      sql`INSERT INTO edital_sdgs ${sql(validatedData.sdgs.map(sdg => ({ edital_id: editalId, sdg })))}`,
      sql`INSERT INTO edital_causes ${sql(validatedData.causes.map(cause => ({ edital_id: editalId, cause })))}`,
      sql`INSERT INTO edital_skills ${sql(validatedData.skills.map(skill => ({ edital_id: editalId, skill }))}`
    ]);

    return NextResponse.json(edital.rows[0], { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Dados inválidos ou erro no servidor' },
      { status: 400 }
    );
  }
}
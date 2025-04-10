import { NextRequest, NextResponse } from "next/server";
import RepositoryFactory from "../../../../domain/factories/RepositoryFactory";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const edital = await RepositoryFactory.getEditalRepository().findByID(Number(id));

    if (!edital) {
      return NextResponse.json({ error: "Edital não encontrado" }, { status: 404 });
    }

    return NextResponse.json(edital, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao buscar o edital: " + error.message },
      { status: 500 }
    );
  }
}

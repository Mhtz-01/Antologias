import { NextRequest, NextResponse } from "next/server";
import RepositoryFactory from "../../../domain/factories/RepositoryFactory";

export async function GET(req: NextRequest) {
  try {
    const editais = await RepositoryFactory.getEditalRepository().findAll();

    return NextResponse.json(editais, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao buscar editais: " + error.message },
      { status: 500 }
    );
  }
}

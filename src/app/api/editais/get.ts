import editalService from "@/domain/services/editalService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const editais = await editalService.getEditais();

    return NextResponse.json(editais, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao buscar editais: " + error.message },
      { status: 500 }
    );
  }
}

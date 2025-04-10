import { NextRequest, NextResponse } from "next/server";
import editalService from "@/domain/services/editalService";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID do edital é obrigatório" }, { status: 400 });
    }

    await editalService.delete(parseInt(id))

    return NextResponse.json({ message: "Edital removido com sucesso" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

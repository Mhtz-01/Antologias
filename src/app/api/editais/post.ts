import { NextRequest, NextResponse } from "next/server";
import createEditalService from "../../../domain/services/createEditalService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 
    const { title, icon, description, funding_min, funding_max, sponsor, sdgs, causes, skills } = body;

    const edital = createEditalService.create({ title, icon, description, funding_min, funding_max, sponsor, sdgs, causes, skills });

    return NextResponse.json({ message: "Edital criado", edital }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

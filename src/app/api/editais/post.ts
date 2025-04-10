import { NextRequest, NextResponse } from "next/server";
import editalService from "@/domain/services/editalService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 
    const { title, icon, description, funding_min, funding_max, sponsor, sdgs, causes, skills, edital_url, start_of_submission, end_of_submission } = body;

    const edital = editalService.create({ title, icon, description, funding_min, funding_max, sponsor, sdgs, causes, skills, edital_url, start_of_submission, end_of_submission });

    return NextResponse.json({ message: "Edital criado", edital }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

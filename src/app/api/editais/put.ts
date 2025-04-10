import { NextRequest, NextResponse } from "next/server";
import editalService from "@/domain/services/editalService";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id, 
      title,
      icon,
      description,
      funding_min,
      funding_max,
      sponsor,
      sdgs,
      causes,
      skills,
      edital_url,
      deadline,
    } = body;

    const updated = editalService.update({
      id,
      title,
      icon,
      description,
      funding_min,
      funding_max,
      sponsor,
      sdgs,
      causes,
      skills,
      edital_url,
      deadline,
    });

    return NextResponse.json({ message: "Edital atualizado", edital: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

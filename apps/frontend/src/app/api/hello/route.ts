// src/app/api/hello/route.ts
import { NextResponse } from 'next/server'; // Importa NextResponse para una mejor práctica con APIs de Next.js

export async function GET(request: Request) {
  // Devuelve un objeto JSON. NextResponse.json() se encarga de los headers y stringify.
  return NextResponse.json({ message: 'Hello, from API!' });
}
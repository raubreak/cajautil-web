import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      disabled: true,
      message: 'La generacion automatica de articulos esta desactivada para mantener la calidad editorial.',
    },
    { status: 410 },
  );
}

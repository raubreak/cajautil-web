import CalculadoraSueldoNetoClient from "@/components/tools/CalculadoraSueldoNetoClient";

export default function CalculadoraSueldo() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      <CalculadoraSueldoNetoClient />
    </main>
  );
}

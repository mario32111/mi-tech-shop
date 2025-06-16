interface ApiData {
  message: string;
}

export default async function InvoiceList() {
  let data: ApiData | null = null;
  let error: string | null = null;

  try {
    const apiUrl =
      process.env.NODE_ENV === 'production'
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL || ''}/api/hello`
        : 'http://localhost:3000/api/hellos';

    const res = await fetch(apiUrl);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error HTTP! Estado: ${res.status}, Mensaje: ${errorText}`);
    }

    data = await res.json();
  } catch (err: any) {
    console.error("Error al obtener datos en el servidor:", err);
    error = err.message || "No se pudieron cargar los datos.";
  }

  if (error) {
    return (
      <div>
        <p>Error:</p>
        <p>{error}</p>
        <p>
          Asegúrate de que tu servidor de desarrollo de Next.js esté corriendo y que la API
          (`src/app/api/hello/route.ts`) esté disponible y devuelva JSON.
        </p>
      </div>
    );
  }

  if (!data) {
    return <div><p>No hay datos disponibles en este momento.</p></div>;
  }

  return (
    <div>
      <div>
        <p>Mensaje de la API:</p>
        <p>{data.message}</p>
      </div>
    </div>
  );
}

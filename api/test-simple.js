export default async function handler(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  try {
    console.log('🔍 FUNCIÓN SIMPLE - Inicio');
    
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('🔍 FUNCIÓN SIMPLE - Procesamiento completado');

    return new Response(JSON.stringify({
      success: true,
      message: 'Función simple funcionando correctamente',
      timestamp: new Date().toISOString(),
      method: request.method,
      hasBody: request.method === 'POST'
    }), { status: 200, headers });

  } catch (error) {
    console.error('❌ Error en función simple:', error);
    return new Response(JSON.stringify({
      error: 'Error en función simple',
      details: error.message,
      timestamp: new Date().toISOString()
    }), { status: 500, headers });
  }
}

export default function handler(request) {
  return new Response(JSON.stringify({
    success: true,
    message: 'Función mínima funcionando',
    timestamp: new Date().toISOString(),
    method: request.method
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

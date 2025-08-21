// Utilidad para verificar y corregir IDs del formulario de Google Forms

// IDs actuales (probablemente incorrectos)
export const currentFormIds = {
  fullName: 'entry.2113807473',
  email: 'entry.1807164578',
  location: 'entry.316240725',
  whatsapp: 'entry.588822403',
  attendance: 'entry.1776417857',
  dataConsent: 'entry.1174231297'
};

// Función para verificar IDs en la consola
export const verifyFormIds = () => {
  console.log('=== VERIFICACIÓN DE IDs DEL FORMULARIO ===');
  console.log('');
  console.log('IDs actuales en el código:');
  console.log('- Nombre Completo:', currentFormIds.fullName);
  console.log('- Email:', currentFormIds.email);
  console.log('- País y Ciudad:', currentFormIds.location);
  console.log('- WhatsApp:', currentFormIds.whatsapp);
  console.log('- Modalidad:', currentFormIds.attendance);
  console.log('- Consentimiento:', currentFormIds.dataConsent);
  console.log('');
  console.log('URL del formulario:');
  console.log('https://docs.google.com/forms/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse');
  console.log('');
  console.log('INSTRUCCIONES PARA VERIFICAR IDs:');
  console.log('1. Ve a tu formulario de Google Forms');
  console.log('2. Click derecho en el primer campo (Nombre)');
  console.log('3. "Inspeccionar elemento"');
  console.log('4. Busca el atributo "name" en el input');
  console.log('5. Anota el número después de "entry."');
  console.log('6. Repite para cada campo');
  console.log('7. Compara con los IDs de arriba');
  console.log('');
  console.log('EJEMPLO:');
  console.log('<input name="entry.1234567890" ...> ← El ID es 1234567890');
};

// Función para probar envío con IDs específicos
export const testFormSubmission = (data: any, customIds?: any) => {
  console.log('=== PRUEBA DE ENVÍO CON IDs ===');
  
  const ids = customIds || currentFormIds;
  console.log('Usando IDs:', ids);
  
  const params = new URLSearchParams({
    [ids.fullName]: data.fullName,
    [ids.email]: data.email,
    [ids.location]: data.location,
    [ids.whatsapp]: data.whatsapp || '',
    [ids.attendance]: data.attendance,
    [ids.dataConsent]: data.dataConsent ? 'Sí' : 'No'
  });
  
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse';
  const testUrl = `${formUrl}?${params.toString()}`;
  
  console.log('URL de prueba:');
  console.log(testUrl);
  console.log('');
  console.log('Para probar manualmente:');
  console.log('1. Copia la URL de arriba');
  console.log('2. Pégalo en una nueva pestaña');
  console.log('3. Si funciona, verás una página de Google Forms');
  console.log('4. Si no funciona, verás un error');
  
  return testUrl;
};

// Función para generar instrucciones de actualización
export const generateUpdateInstructions = (correctIds: any) => {
  console.log('=== INSTRUCCIONES DE ACTUALIZACIÓN ===');
  console.log('');
  console.log('Si encontraste los IDs correctos, actualiza el archivo:');
  console.log('src/hooks/use-registration-form.ts');
  console.log('');
  console.log('Reemplaza los IDs actuales con:');
  console.log('const params = new URLSearchParams({');
  console.log(`  '${correctIds.fullName}': data.fullName,`);
  console.log(`  '${correctIds.email}': data.email,`);
  console.log(`  '${correctIds.location}': data.location,`);
  console.log(`  '${correctIds.whatsapp}': data.whatsapp || '',`);
  console.log(`  '${correctIds.attendance}': data.attendance,`);
  console.log(`  '${correctIds.dataConsent}': data.dataConsent ? 'Sí' : 'No'`);
  console.log('});');
  console.log('');
  console.log('También actualiza:');
  console.log('src/utils/form-id-verifier.ts');
  console.log('');
  console.log('Reemplaza currentFormIds con:');
  console.log('export const currentFormIds = {');
  console.log(`  fullName: '${correctIds.fullName}',`);
  console.log(`  email: '${correctIds.email}',`);
  console.log(`  location: '${correctIds.location}',`);
  console.log(`  whatsapp: '${correctIds.whatsapp}',`);
  console.log(`  attendance: '${correctIds.attendance}',`);
  console.log(`  dataConsent: '${correctIds.dataConsent}'`);
  console.log('};');
};

// Función para crear un formulario de prueba
export const createTestForm = () => {
  console.log('=== FORMULARIO DE PRUEBA ===');
  console.log('');
  console.log('Datos de prueba para enviar:');
  const testData = {
    fullName: 'Juan Pérez',
    email: 'juan@test.com',
    location: 'Argentina, Buenos Aires',
    whatsapp: '+54 9 11 1234-5678',
    attendance: 'virtual',
    dataConsent: true
  };
  console.log(testData);
  console.log('');
  console.log('Para probar con estos datos:');
  console.log('testFormSubmission(testData)');
  
  return testData;
};

// Nueva función para probar con IDs personalizados fácilmente
export const testWithCustomIds = (customIds: any) => {
  console.log('=== PRUEBA CON IDs PERSONALIZADOS ===');
  console.log('IDs proporcionados:', customIds);
  
  const testData = {
    fullName: 'Juan Pérez',
    email: 'juan@test.com',
    location: 'Argentina, Buenos Aires',
    whatsapp: '+54 9 11 1234-5678',
    attendance: 'virtual',
    dataConsent: true
  };
  
  return testFormSubmission(testData, customIds);
};

// Función para actualizar IDs automáticamente
export const updateFormIds = (newIds: any) => {
  console.log('=== ACTUALIZACIÓN DE IDs ===');
  console.log('Nuevos IDs:', newIds);
  
  // Actualizar currentFormIds
  Object.assign(currentFormIds, newIds);
  
  console.log('IDs actualizados. Ahora puedes probar el formulario.');
  console.log('Para probar: testFormSubmission(createTestForm())');
  
  return currentFormIds;
};

// Función para mostrar instrucciones rápidas
export const showQuickInstructions = () => {
  console.log('=== INSTRUCCIONES RÁPIDAS ===');
  console.log('');
  console.log('📋 FORMULARIO CONFIRMADO:');
  console.log('https://docs.google.com/forms/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/viewform');
  console.log('');
  console.log('🔍 CAMPOS A VERIFICAR:');
  console.log('1. Nombre Completo (Texto corto)');
  console.log('2. Email (Email)');
  console.log('3. País y Ciudad (Texto corto)');
  console.log('4. WhatsApp (Texto corto)');
  console.log('5. Modalidad de Asistencia (Múltiple choice)');
  console.log('6. Consentimiento de Datos (Checkbox)');
  console.log('');
  console.log('📝 PASOS PARA OBTENER IDs:');
  console.log('1. Ve al formulario de arriba');
  console.log('2. Click derecho en cada campo');
  console.log('3. "Inspeccionar elemento"');
  console.log('4. Busca: <input name="entry.XXXXX" ...>');
  console.log('5. Anota los números después de "entry."');
  console.log('');
  console.log('⚡ COMANDO PARA ACTUALIZAR:');
  console.log('updateFormIds({');
  console.log('  fullName: "entry.TU_ID_REAL",        // Nombre Completo');
  console.log('  email: "entry.TU_ID_REAL",           // Email');
  console.log('  location: "entry.TU_ID_REAL",        // País y Ciudad');
  console.log('  whatsapp: "entry.TU_ID_REAL",        // WhatsApp');
  console.log('  attendance: "entry.TU_ID_REAL",      // Modalidad');
  console.log('  dataConsent: "entry.TU_ID_REAL"      // Consentimiento');
  console.log('});');
  console.log('');
  console.log('🧪 COMANDO PARA PROBAR:');
  console.log('testFormSubmission(createTestForm())');
};

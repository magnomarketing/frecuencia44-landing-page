/**
 * Función utilitaria para hacer scroll suave a un elemento por ID
 * @param elementId - El ID del elemento al que hacer scroll
 * @param offset - Offset adicional en píxeles (opcional)
 */
export const scrollToElement = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Función específica para scroll al formulario de registro
 */
export const scrollToRegistration = () => {
  scrollToElement('registro', 80); // 80px de offset para la navegación fija
};

/**
 * Función específica para scroll a la sección de masterclass
 */
export const scrollToMasterclass = () => {
  scrollToElement('masterclass', 80);
};

/**
 * Función específica para scroll a la sección de metodología
 */
export const scrollToMethodology = () => {
  scrollToElement('metodologia', 80);
};

/**
 * Función específica para scroll a la sección de donativo
 */
export const scrollToDonation = () => {
  scrollToElement('donativo', 80);
};

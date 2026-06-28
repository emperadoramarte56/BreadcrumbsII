export function submitNewsletterForm(email) {
  return new Promise((resolve, reject) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      reject(new Error("Por favor ingresa un correo electrónico válido."));
      return;
    }

    const latency = 600 + Math.random() * 600;

    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error("El servidor no pudo procesar tu solicitud. Intenta de nuevo."));
        return;
      }
      resolve({ message: `¡Listo! ${email.trim()} fue suscrito correctamente.` });
    }, latency);
  });
}

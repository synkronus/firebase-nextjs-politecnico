export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as Colombian phone number
  if (cleaned.startsWith('57')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  
  return phone;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateStudent(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.nombre || data.nombre.trim().length === 0) {
    errors.push('Nombre es requerido');
  }
  
  if (!data.apellido || data.apellido.trim().length === 0) {
    errors.push('Apellido es requerido');
  }
  
  if (!data.correo || !validateEmail(data.correo)) {
    errors.push('Correo electrónico inválido');
  }
  
  if (!data.edad || data.edad < 16 || data.edad > 100) {
    errors.push('Edad debe estar entre 16 y 100');
  }
  
  if (!data.semestre || data.semestre < 1 || data.semestre > 12) {
    errors.push('Semestre debe estar entre 1 y 12');
  }
  
  if (!data.jornada || !['Diurna', 'Nocturna'].includes(data.jornada)) {
    errors.push('Jornada debe ser Diurna o Nocturna');
  }
  
  if (!data.sexo || !['Masculino', 'Femenino'].includes(data.sexo)) {
    errors.push('Sexo debe ser Masculino o Femenino');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}


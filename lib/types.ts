export interface Student {
  id?: string;
  nombre: string;
  apellido: string;
  telefono: string;
  edad: number;
  correo: string;
  direccion: string;
  universidad: string;
  semestre: number;
  jornada: 'Diurna' | 'Nocturna';
  sexo: 'Masculino' | 'Femenino';
}

export interface StudentFormData extends Omit<Student, 'id'> {}


const admin = require('firebase-admin');

// You'll need to download your service account key from Firebase Console
// Go to Project Settings > Service Accounts > Generate new private key
// Save it as 'serviceAccountKey.json' in this directory
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Sample student data - 10 records as required
const students = [
  {
    nombre: "Juan",
    apellido: "Pérez",
    telefono: "+57 300 123 4567",
    edad: 22,
    correo: "juan.perez@universidad.edu",
    direccion: "Calle 123 #45-67, Bogotá",
    universidad: "Universidad Nacional",
    semestre: 5,
    jornada: "Diurna",
    sexo: "Masculino"
  },
  {
    nombre: "María",
    apellido: "González",
    telefono: "+57 301 234 5678",
    edad: 20,
    correo: "maria.gonzalez@universidad.edu",
    direccion: "Carrera 15 #23-45, Medellín",
    universidad: "Universidad de Antioquia",
    semestre: 3,
    jornada: "Nocturna",
    sexo: "Femenino"
  },
  {
    nombre: "Carlos",
    apellido: "Rodríguez",
    telefono: "+57 302 345 6789",
    edad: 24,
    correo: "carlos.rodriguez@universidad.edu",
    direccion: "Avenida 68 #12-34, Bogotá",
    universidad: "Universidad Javeriana",
    semestre: 7,
    jornada: "Diurna",
    sexo: "Masculino"
  },
  {
    nombre: "Ana",
    apellido: "Martínez",
    telefono: "+57 303 456 7890",
    edad: 19,
    correo: "ana.martinez@universidad.edu",
    direccion: "Calle 50 #78-90, Cali",
    universidad: "Universidad del Valle",
    semestre: 2,
    jornada: "Diurna",
    sexo: "Femenino"
  },
  {
    nombre: "Luis",
    apellido: "García",
    telefono: "+57 304 567 8901",
    edad: 23,
    correo: "luis.garcia@universidad.edu",
    direccion: "Carrera 7 #45-67, Bogotá",
    universidad: "Universidad de los Andes",
    semestre: 6,
    jornada: "Nocturna",
    sexo: "Masculino"
  },
  {
    nombre: "Sofia",
    apellido: "López",
    telefono: "+57 305 678 9012",
    edad: 21,
    correo: "sofia.lopez@universidad.edu",
    direccion: "Calle 85 #12-34, Barranquilla",
    universidad: "Universidad del Norte",
    semestre: 4,
    jornada: "Diurna",
    sexo: "Femenino"
  },
  {
    nombre: "Diego",
    apellido: "Hernández",
    telefono: "+57 306 789 0123",
    edad: 25,
    correo: "diego.hernandez@universidad.edu",
    direccion: "Avenida 19 #56-78, Bucaramanga",
    universidad: "Universidad Industrial de Santander",
    semestre: 9,
    jornada: "Nocturna",
    sexo: "Masculino"
  },
  {
    nombre: "Valentina",
    apellido: "Torres",
    telefono: "+57 307 890 1234",
    edad: 18,
    correo: "valentina.torres@universidad.edu",
    direccion: "Carrera 45 #23-45, Pereira",
    universidad: "Universidad Tecnológica de Pereira",
    semestre: 1,
    jornada: "Diurna",
    sexo: "Femenino"
  },
  {
    nombre: "Andrés",
    apellido: "Ramírez",
    telefono: "+57 308 901 2345",
    edad: 26,
    correo: "andres.ramirez@universidad.edu",
    direccion: "Calle 72 #34-56, Manizales",
    universidad: "Universidad Nacional de Colombia",
    semestre: 10,
    jornada: "Nocturna",
    sexo: "Masculino"
  },
  {
    nombre: "Isabella",
    apellido: "Vargas",
    telefono: "+57 309 012 3456",
    edad: 22,
    correo: "isabella.vargas@universidad.edu",
    direccion: "Avenida 30 #67-89, Cartagena",
    universidad: "Universidad de Cartagena",
    semestre: 8,
    jornada: "Diurna",
    sexo: "Femenino"
  }
];

async function importStudents() {
  try {
    console.log('Starting bulk import of students...');
    
    // Use batch write for efficiency
    const batch = db.batch();
    
    students.forEach((student, index) => {
      const docRef = db.collection('estudiantes').doc();
      batch.set(docRef, student);
      console.log(`Added student ${index + 1}: ${student.nombre} ${student.apellido}`);
    });
    
    await batch.commit();
    console.log('✅ All 10 students imported successfully!');
    
    // Verify the import
    const snapshot = await db.collection('estudiantes').get();
    console.log(`📊 Total documents in collection: ${snapshot.size}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing students:', error);
    process.exit(1);
  }
}

importStudents();

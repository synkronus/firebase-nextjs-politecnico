# Sistema de Gestión de Estudiantes - Firebase + Next.js

Aplicación web desarrollada con Next.js para gestionar registros de estudiantes utilizando Firebase Firestore como base de datos en la nube.

## 🎯 Características

- ✅ **CRUD Completo**: Crear, Leer, Actualizar y Eliminar estudiantes
- ✅ **Importación CSV**: Carga masiva de datos desde archivos CSV
- ✅ **Búsqueda y Filtros**: Buscar por nombre, filtrar por universidad y jornada
- ✅ **Interfaz Moderna**: UI responsive con Tailwind CSS
- ✅ **Validación de Datos**: Validación completa de formularios
- ✅ **Notificaciones**: Feedback visual con toast notifications
- ✅ **Firebase Firestore**: Base de datos en tiempo real en la nube

## 📋 Requisitos

- Node.js 18+ instalado
- Cuenta de Firebase con proyecto configurado
- Archivo `serviceAccountKey.json` de Firebase

## 🚀 Instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
   - Coloca tu archivo `serviceAccountKey.json` en la raíz del proyecto
   - Este archivo se obtiene desde Firebase Console > Project Settings > Service Accounts

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
   - Navega a http://localhost:3000

## 📁 Estructura del Proyecto

```
repo/
├── app/
│   ├── api/
│   │   └── students/          # API Routes para CRUD
│   │       ├── route.ts       # GET all, POST new
│   │       ├── [id]/
│   │       │   └── route.ts   # GET, PUT, DELETE by ID
│   │       └── import-csv/
│   │           └── route.ts   # CSV bulk import
│   ├── globals.css            # Estilos globales
│   ├── layout.tsx             # Layout principal
│   └── page.tsx               # Página principal
├── components/
│   ├── CSVUploader.tsx        # Componente de importación CSV
│   ├── SearchBar.tsx          # Barra de búsqueda y filtros
│   ├── StudentForm.tsx        # Formulario de estudiante
│   └── StudentTable.tsx       # Tabla de estudiantes
├── lib/
│   ├── firebase-admin.ts      # Configuración Firebase Admin
│   ├── types.ts               # TypeScript types
│   └── utils.ts               # Funciones utilitarias
├── public/
│   └── sample-students.csv    # Archivo CSV de ejemplo
└── serviceAccountKey.json     # Credenciales Firebase (NO incluir en git)
```

## 💾 Estructura de Datos

Cada estudiante tiene los siguientes campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| nombre | string | Nombre del estudiante |
| apellido | string | Apellido del estudiante |
| telefono | string | Número de teléfono |
| edad | number | Edad (16-100) |
| correo | string | Correo electrónico |
| direccion | string | Dirección completa |
| universidad | string | Nombre de la universidad |
| semestre | number | Semestre actual (1-12) |
| jornada | string | "Diurna" o "Nocturna" |
| sexo | string | "Masculino" o "Femenino" |

## 📤 Importación CSV

### Formato del Archivo CSV

El archivo CSV debe tener exactamente estas columnas (en este orden):

```csv
nombre,apellido,telefono,edad,correo,direccion,universidad,semestre,jornada,sexo
Juan,Pérez,+57 300 123 4567,22,juan.perez@universidad.edu,Calle 123 #45-67 Bogotá,Universidad Nacional,5,Diurna,Masculino
```

### Pasos para Importar

1. Haz clic en el botón **"📁 Importar CSV"**
2. Arrastra y suelta tu archivo CSV o haz clic para seleccionarlo
3. Haz clic en **"Importar"**
4. El sistema validará y cargará los datos automáticamente

### Archivo de Ejemplo

Descarga el archivo de ejemplo desde la aplicación o usa `public/sample-students.csv`

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start

# Linting
npm run lint

# Importar datos con script Node.js (legacy)
npm run import
```

## 🌐 Despliegue

### Vercel (Recomendado)

1. Sube el proyecto a GitHub
2. Conecta tu repositorio en Vercel
3. Agrega `serviceAccountKey.json` como variable de entorno
4. Despliega automáticamente

### Otras Plataformas

Compatible con cualquier plataforma que soporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 🔒 Seguridad

- ⚠️ **NUNCA** subas `serviceAccountKey.json` a repositorios públicos
- El archivo está incluido en `.gitignore` por seguridad
- Usa variables de entorno en producción
- Configura reglas de seguridad en Firebase Firestore

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Firebase Admin SDK** - Backend Firebase
- **Papaparse** - Parsing CSV
- **React Hot Toast** - Notificaciones

## 📝 Funcionalidades Implementadas

### ✅ CREATE (Crear)
- Formulario completo con validación
- Importación masiva desde CSV
- Validación de datos en tiempo real

### ✅ READ (Leer)
- Listado completo de estudiantes
- Búsqueda por texto
- Filtros por universidad y jornada
- Vista detallada de cada estudiante

### ✅ UPDATE (Actualizar)
- Edición de todos los campos
- Validación de cambios
- Confirmación visual

### ✅ DELETE (Eliminar)
- Eliminación con confirmación
- Feedback visual
- Actualización automática de la lista

## 📊 Capturas de Pantalla

(Incluir capturas de pantalla en la documentación PDF)

1. Dashboard principal
2. Formulario de agregar estudiante
3. Importación CSV
4. Búsqueda y filtros
5. Edición de estudiante
6. Confirmación de eliminación

## 🎓 Actividad Académica

Este proyecto fue desarrollado como parte de la **Actividad Sumativa Unidad 4** del módulo "Fundamentos de la Tecnología Cloud" del Politécnico Grancolombiano.

### Objetivos Cumplidos

- ✅ Conexión con base de datos en la nube (Firebase Firestore)
- ✅ Lectura e importación de archivos CSV
- ✅ Operaciones CRUD completas
- ✅ Interfaz gráfica moderna y funcional
- ✅ Validación y manejo de errores
- ✅ Documentación completa

## 👨‍💻 Autor
Politécnico Grancolombiano
Maestría en Arquitectura Cloud

## 📄 Licencia

ISC


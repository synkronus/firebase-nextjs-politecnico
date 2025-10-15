import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import Papa from 'papaparse';
import { validateStudent } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Read file content
    const text = await file.text();
    
    // Parse CSV
    const parseResult = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });
    
    if (parseResult.errors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'CSV parsing error',
          details: parseResult.errors 
        },
        { status: 400 }
      );
    }
    
    const students = parseResult.data as any[];
    
    if (students.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No data found in CSV' },
        { status: 400 }
      );
    }
    
    // Validate and transform data
    const validStudents: any[] = [];
    const errors: any[] = [];
    
    students.forEach((student, index) => {
      // Transform data types
      const transformedStudent = {
        nombre: student.nombre?.trim() || '',
        apellido: student.apellido?.trim() || '',
        telefono: student.telefono?.trim() || '',
        edad: parseInt(student.edad) || 0,
        correo: student.correo?.trim() || '',
        direccion: student.direccion?.trim() || '',
        universidad: student.universidad?.trim() || '',
        semestre: parseInt(student.semestre) || 0,
        jornada: student.jornada?.trim() || '',
        sexo: student.sexo?.trim() || '',
      };
      
      const validation = validateStudent(transformedStudent);
      
      if (validation.valid) {
        validStudents.push(transformedStudent);
      } else {
        errors.push({
          row: index + 2, // +2 because of header and 0-index
          data: student,
          errors: validation.errors
        });
      }
    });
    
    if (validStudents.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No valid students found in CSV',
          validationErrors: errors
        },
        { status: 400 }
      );
    }
    
    // Batch write to Firestore
    const batch = db.batch();
    const addedIds: string[] = [];
    const baseTimestamp = new Date();

    validStudents.forEach((student, index) => {
      const docRef = db.collection('estudiantes').doc();
      // Add timestamp with slight offset to maintain order within batch
      const timestamp = new Date(baseTimestamp.getTime() + index);
      batch.set(docRef, {
        ...student,
        createdAt: timestamp.toISOString(),
      });
      addedIds.push(docRef.id);
    });

    await batch.commit();
    
    return NextResponse.json({
      success: true,
      message: `Successfully imported ${validStudents.length} students`,
      imported: validStudents.length,
      failed: errors.length,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error: any) {
    console.error('Error importing CSV:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


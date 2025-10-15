import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { Student } from '@/lib/types';
import { validateStudent } from '@/lib/utils';

// GET all students or search
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const universidad = searchParams.get('universidad');
    const jornada = searchParams.get('jornada');
    
    let query = db.collection('estudiantes');

    // Apply filters
    if (universidad) {
      query = query.where('universidad', '==', universidad) as any;
    }

    if (jornada) {
      query = query.where('jornada', '==', jornada) as any;
    }

    const snapshot = await query.get();
    let students: Student[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Student));

    // Sort by createdAt (newest first), fallback to id for old records
    students.sort((a: any, b: any) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA; // Descending order (newest first)
    });
    
    // Client-side search filter (Firestore doesn't support full-text search)
    if (search) {
      const searchLower = search.toLowerCase();
      students = students.filter(student => 
        student.nombre.toLowerCase().includes(searchLower) ||
        student.apellido.toLowerCase().includes(searchLower) ||
        student.correo.toLowerCase().includes(searchLower) ||
        student.universidad.toLowerCase().includes(searchLower)
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: students,
      count: students.length 
    });
  } catch (error: any) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new student
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate student data
    const validation = validateStudent(data);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }
    
    // Remove id if present
    const { id, ...studentData } = data;

    // Add timestamp for sorting
    const studentWithTimestamp = {
      ...studentData,
      createdAt: new Date().toISOString(),
    };

    // Add to Firestore
    const docRef = await db.collection('estudiantes').add(studentWithTimestamp);
    
    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        ...studentData
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


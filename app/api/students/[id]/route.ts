import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { validateStudent } from '@/lib/utils';

// GET single student by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const doc = await db.collection('estudiantes').doc(params.id).get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        id: doc.id,
        ...doc.data()
      }
    });
  } catch (error: any) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update student
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Remove id from data
    const { id, ...studentData } = data;
    
    // Check if document exists
    const docRef = db.collection('estudiantes').doc(params.id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }
    
    // Update document
    await docRef.update(studentData);
    
    return NextResponse.json({
      success: true,
      data: {
        id: params.id,
        ...studentData
      }
    });
  } catch (error: any) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE student
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = db.collection('estudiantes').doc(params.id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }
    
    await docRef.delete();
    
    return NextResponse.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


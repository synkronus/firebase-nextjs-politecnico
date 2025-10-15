'use client';

import { useState, useEffect } from 'react';
import { Student } from '@/lib/types';
import StudentTable from '@/components/StudentTable';
import StudentForm from '@/components/StudentForm';
import CSVUploader from '@/components/CSVUploader';
import SearchBar from '@/components/SearchBar';
import ConfirmModal from '@/components/ConfirmModal';
import Pagination from '@/components/Pagination';
import toast from 'react-hot-toast';

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showCSVUpload, setShowCSVUpload] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUniversidad, setFilterUniversidad] = useState('');
  const [filterJornada, setFilterJornada] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; student: Student | null }>({
    show: false,
    student: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterUniversidad) params.append('universidad', filterUniversidad);
      if (filterJornada) params.append('jornada', filterJornada);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/students?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setStudents(result.data);
        setFilteredStudents(result.data);
        setCurrentPage(1); // Reset to first page when data changes
      } else {
        toast.error('Error al cargar estudiantes');
      }
    } catch (error) {
      toast.error('Error de conexión');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [filterUniversidad, filterJornada, searchTerm]);

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDeleteStudent = (student: Student) => {
    setDeleteConfirm({ show: true, student });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.student?.id) return;

    try {
      const response = await fetch(`/api/students/${deleteConfirm.student.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Estudiante eliminado exitosamente');
        fetchStudents();
      } else {
        toast.error('Error al eliminar estudiante');
      }
    } catch (error) {
      toast.error('Error de conexión');
      console.error(error);
    } finally {
      setDeleteConfirm({ show: false, student: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, student: null });
  };

  const handleFormSubmit = async (data: Student) => {
    try {
      const url = editingStudent 
        ? `/api/students/${editingStudent.id}`
        : '/api/students';
      
      const method = editingStudent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          editingStudent 
            ? 'Estudiante actualizado exitosamente'
            : 'Estudiante creado exitosamente'
        );
        setShowForm(false);
        setEditingStudent(null);
        fetchStudents();
      } else {
        toast.error(result.errors?.join(', ') || 'Error al guardar');
      }
    } catch (error) {
      toast.error('Error de conexión');
      console.error(error);
    }
  };

  const handleCSVUpload = () => {
    setShowCSVUpload(true);
  };

  const handleCSVImportComplete = () => {
    setShowCSVUpload(false);
    fetchStudents();
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterUniversidad('');
    setFilterJornada('');
  };

  // Get unique universities for filter
  const universities = Array.from(new Set(students.map(s => s.universidad))).sort();

  useEffect(() => {
    fetchStudents();
  }, [searchTerm, filterUniversidad, filterJornada]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Sistema de Gestión de Estudiantes
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Firebase Firestore + Next.js
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={handleAddStudent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              + Agregar Estudiante
            </button>
            <button
              onClick={handleCSVUpload}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              📁 Importar CSV
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            Total: <span className="font-semibold">{filteredStudents.length}</span> estudiantes
          </div>
        </div>

        {/* Search and Filters */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterUniversidad={filterUniversidad}
          onUniversidadChange={setFilterUniversidad}
          filterJornada={filterJornada}
          onJornadaChange={setFilterJornada}
          universities={universities}
          onClearFilters={handleClearFilters}
        />

        {/* Students Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Cargando estudiantes...</p>
          </div>
        ) : (
          <>
            <StudentTable
              students={paginatedStudents}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredStudents.length}
              itemsPerPage={itemsPerPage}
              startIndex={startIndex}
              endIndex={endIndex}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </>
        )}
      </main>

      {/* Student Form Modal */}
      {showForm && (
        <StudentForm
          student={editingStudent}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingStudent(null);
          }}
        />
      )}

      {/* CSV Upload Modal */}
      {showCSVUpload && (
        <CSVUploader
          onComplete={handleCSVImportComplete}
          onCancel={() => setShowCSVUpload(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && deleteConfirm.student && (
        <ConfirmModal
          title="Eliminar Estudiante"
          message={`¿Está seguro de eliminar a ${deleteConfirm.student.nombre} ${deleteConfirm.student.apellido}?`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          type="danger"
        />
      )}
    </div>
  );
}


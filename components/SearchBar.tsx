'use client';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterUniversidad: string;
  onUniversidadChange: (value: string) => void;
  filterJornada: string;
  onJornadaChange: (value: string) => void;
  universities: string[];
  onClearFilters: () => void;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  filterUniversidad,
  onUniversidadChange,
  filterJornada,
  onJornadaChange,
  universities,
  onClearFilters,
}: SearchBarProps) {
  const hasActiveFilters = searchTerm !== '' || filterUniversidad !== '' || filterJornada !== '';

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex items-end gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Nombre, apellido, correo..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Universidad Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Universidad
          </label>
          <select
            value={filterUniversidad}
            onChange={(e) => onUniversidadChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            {universities.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>

        {/* Jornada Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jornada
          </label>
          <select
            value={filterJornada}
            onChange={(e) => onJornadaChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            <option value="Diurna">Diurna</option>
            <option value="Nocturna">Nocturna</option>
          </select>
        </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex-shrink-0">
            <button
              onClick={onClearFilters}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
              title="Limpiar todos los filtros"
            >
              <span>✕</span>
              <span>Limpiar</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


# Changelog

Todas las modificaciones importantes en este proyecto se documentan aquí.

## [1.4.0] - 2026-03-14

### Added

- Vista calendario en el Dashboard.
- Tabs para cambiar entre Mis Reservas, Horarios Disponibles y Calendario.
- Componente DayDetails para ver detalles de un día específico.
- Visualización de días disponibles y reservados en el calendario.
- Botón de reservar y cancelar en el modal de detalles del día.

### Fixed

- Centrado de grids en Mis Reservas y Horarios Disponibles.

## [1.3.0] - 2026-03-13

### Added

- Job programable para limpieza automática de base de datos.
- Limpieza de reservas pasadas.
- Limpieza de timeSlots pasados.

## [1.2.0] - 2026-03-12

### Added

- Implementación de estado global para manejo de queries en el frontend.
- Implementación de invalidación de queries para mantener datos actualizados.
- Refactorización de componentes para utilizar estado global.

## [1.1.1] - 2026-03-11

### Fixed

- Correción de redirección después de eliminar cuenta en el frontend.

## [1.1.0] - 2026-03-11

### Added

- Visualización de perfil de usuario en el frontend.
- Edición de perfil con validación de cambios.
- Eliminación de cuenta con confirmación.

### Fixed

- Corrección de llamada al método de eliminación de cuenta en el backend.

## [1.0.0] - 2026-03-08

### Added

- Lanzamiento inicial de TimeSlot.
- Backend con usuarios, bookings y timeSlots.
- Frontend funcional con autenticación y CRUD básico.

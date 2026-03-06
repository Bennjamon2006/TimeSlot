# TimeSlot Backend

API REST para gestión de reservas de horarios.

## Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Base de datos:** PostgreSQL + Prisma 7
- **Auth:** JWT + bcrypt
- **Validación:** Zod
- **Testing:** Jest + supertest

## Estructura

```
src/
├── config/          # Configuración (env)
├── controllers/     # Handlers HTTP
├── database.ts      # Conexión Prisma
├── filters/         # Filtros para queries
├── handlers/       # Handlers genéricos
├── helpers/        # Utilidades (Response, errors)
├── middlewares/    # Express middlewares
├── mappers/       # Mapeo de datos
├── routes/        # Definición de rutas
├── schemas/       # Schemas Zod
├── services/      # Lógica de negocio
├── types/        # Tipos TS
└── __tests__/    # Tests
    ├── setup.ts      # Setup global mocks
    ├── fixtures.ts    # Datos de prueba
    ├── *.test.ts     # Tests unitarios (servicios)
    └── e2e/          # Tests E2E
        ├── setup.ts
        ├── fixtures.ts
        └── *.e2e.test.ts
```

## Testing

### Tests Unitarios

- Mocks de Prisma con jest.mock()
- Tests de servicios (lógica de negocio)
- Ejecución aislada sin base de datos

```bash
npm test              # Unit tests
npm run test:watch   # Watch mode
```

### Tests E2E

- Base de datos PostgreSQL real (Docker)
- Prueban la API completa con supertest
- Limpieza automática entre tests

```bash
# Iniciar PostgreSQL de test
npm run docker:test:up

# Ejecutar tests E2E
npm run test:e2e

# Detener PostgreSQL de test
npm run test:e2e:stop
```

#### Docker

```bash
# docker-compose.test.yml
postgresql://test:test@localhost:5433/timeslot_test
```

### Cobertura

```bash
npm run test:coverage
```

## Base de datos

### Modelos

**User**
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador |
| name | String | Nombre |
| email | String | Email (único) |
| password | String | Hash bcrypt |
| role | String | USER / ADMIN |
| createdAt | DateTime | Creación |
| updatedAt | DateTime | Actualización |

**TimeSlot**
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador |
| startTime | DateTime | Inicio |
| endTime | DateTime | Fin |
| createdAt | DateTime | Creación |
| updatedAt | DateTime | Actualización |

**Booking**
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador |
| userId | UUID | FK a User |
| timeSlotId | UUID | FK a TimeSlot (único) |
| createdAt | DateTime | Creación |
| updatedAt | DateTime | Actualización |

Relación: User 1:N Booking, TimeSlot 1:1 Booking

## Autenticación

- JWT en header `Authorization: Bearer <token>`
- Roles: USER, ADMIN
- Middleware `authValidator` → verifica JWT
- Middleware `adminValidator` → verifica rol ADMIN

## Endpoints

### Auth

| Método | Ruta            | Auth    | Descripción   |
| ------ | --------------- | ------- | ------------- |
| POST   | /api/auth/login | público | Login usuario |

### Users

| Método | Ruta          | Auth    | Descripción       |
| ------ | ------------- | ------- | ----------------- |
| POST   | /api/users/   | público | Registrar usuario |
| GET    | /api/users/me | JWT     | Ver perfil        |
| PUT    | /api/users/me | JWT     | Actualizar perfil |
| DELETE | /api/users/me | JWT     | Eliminar cuenta   |

### Time Slots

| Método | Ruta                | Auth  | Descripción          |
| ------ | ------------------- | ----- | -------------------- |
| GET    | /api/time-slots     | -     | Listar (con filtros) |
| GET    | /api/time-slots/:id | -     | Ver uno              |
| POST   | /api/time-slots     | admin | Crear                |
| PUT    | /api/time-slots/:id | admin | Actualizar           |
| DELETE | /api/time-slots/:id | admin | Eliminar             |

### Bookings

| Método | Ruta              | Auth | Descripción         |
| ------ | ----------------- | ---- | ------------------- |
| GET    | /api/bookings     | JWT  | Listar mis reservas |
| GET    | /api/bookings/:id | JWT  | Ver reserva         |
| POST   | /api/bookings     | JWT  | Crear reserva       |
| DELETE | /api/bookings/:id | JWT  | Eliminar reserva    |

### Filtros Time Slots

Query params (todos opcionales):

| Param       | Tipo       | Descripción                |
| ----------- | ---------- | -------------------------- |
| startBefore | ISO date   | Inicio antes de            |
| startAfter  | ISO date   | Inicio después de          |
| endBefore   | ISO date   | Fin antes de               |
| endAfter    | ISO date   | Fin después de             |
| booked      | true/false | Filtrar por disponibilidad |

Ejemplo:

```
GET /api/time-slots?startAfter=2026-03-06&startBefore=2026-03-08
```

## Validación

- **Body:** Schemas Zod + middleware `bodyValidator`
- **Params:** Schemas Zod + middleware `paramsValidator`
- **Query:** Filters Zod + middleware `filterParser`

## Scripts

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Tests
npm test              # Unit tests
npm run test:e2e      # E2E tests
npm run test:coverage # Coverage

# Prisma
npx prisma generate    # Generar Client
npx prisma db push     # Push schema

# Docker test DB
npm run docker:test:up   # Iniciar PostgreSQL test
npm run docker:test:down # Detener PostgreSQL test
```

## Variables de entorno

```env
POSTGRES_URL=postgres://user:pass@host:port/db
POSTGRES_TEST_URL=postgres://test:test@localhost:5433/timeslot_test
PORT=4000
HOST=localhost
JWT_SECRET=your_jwt_secret
```

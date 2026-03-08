# TimeSlot

API REST + Frontend para gestión de reservas de horarios.

## Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express 5
- **DB:** PostgreSQL + Prisma 7
- **Auth:** JWT + bcrypt
- **Validación:** Zod
- **Docs:** Swagger (`/api-docs`)

### Frontend

- **Framework:** React 18 + Vite
- **UI:** MUI
- **Router:** React Router v6
- **State:** Context + Custom Hooks

## Estructura

```
TimeSlot/
├── backend/           # API REST
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── middlewares/
│   │   └── __tests__/
│   └── prisma/
├── frontend/         # App React
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       └── context/
└── docker-compose.test.yml
```

## Inicio rápido

```bash
# Instalar dependencias
npm install

# Backend
cd backend
cp .env.example .env
npm run dev

# Frontend
cd frontend
npm run dev

# Tests
npm test          # Unit
npm run test:e2e  # E2E (requiere Docker)
```

## Variables de entorno

### Backend

```env
POSTGRES_URL=postgres://user:pass@host:port/db
JWT_SECRET=your_jwt_secret
PORT=4000
```

### Frontend

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

## API Endpoints

### Auth

| Método | Ruta                | Descripción |
| ------ | ------------------- | ----------- |
| POST   | /api/auth/login     | Login       |
| POST   | /api/users/register | Registro    |

### Users

| Método | Ruta          | Descripción       |
| ------ | ------------- | ----------------- |
| GET    | /api/users/me | Mi perfil         |
| PATCH  | /api/users/me | Actualizar perfil |
| DELETE | /api/users/me | Eliminar cuenta   |
| GET    | /api/users    | Listar (admin)    |

### Time Slots

| Método | Ruta                | Descripción      |
| ------ | ------------------- | ---------------- |
| GET    | /api/time-slots     | Listar (filtros) |
| GET    | /api/time-slots/:id | Ver uno          |
| POST   | /api/time-slots     | Crear (admin)    |
| DELETE | /api/time-slots/:id | Eliminar (admin) |

### Bookings

| Método | Ruta              | Descripción   |
| ------ | ----------------- | ------------- |
| GET    | /api/bookings     | Mis reservas  |
| POST   | /api/bookings     | Crear reserva |
| DELETE | /api/bookings/:id | Cancelar      |

## Tests

```bash
# Unit tests
npm test

# E2E tests (con Docker)
npm run docker:test:up   # Iniciar DB test
npm run test:e2e
npm run docker:test:down # Detener DB test
```

## Ver también

- [README Backend](./backend/README.md)
- [README Frontend](./frontend/README.md)

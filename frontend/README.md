# TimeSlot Frontend

## Stack

- **Framework:** React 18 + Vite
- **UI:** MUI (Material UI)
- **Router:** React Router v6
- **State:** React Context + Custom Hooks
- **Estilos:** Emotion (MUI)

## Estructura

```
src/
├── api.ts                 # Wrapper fetch con auth
├── components/           # Componentes reutilizables
│   ├── AvailableTimeSlots.tsx
│   ├── BookingCard.tsx
│   ├── CreateTimeSlot.tsx
│   ├── Header.tsx
│   ├── LoadingPlaceholder.tsx
│   ├── MyBookings.tsx
│   ├── Router.tsx
│   ├── TimeSlotCard.tsx
│   └── ...
├── constants/            # Constantes (mensajes, etc)
├── context/auth/         # Auth Context + Provider
├── helpers/              # Utilidades
├── hooks/                # Custom hooks
│   ├── useAuth.ts
│   ├── useMutation.ts
│   └── useQuery.ts
├── pages/                # Páginas
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   └── AdminDashboard.tsx
└── services/             # API services
    ├── auth.service.ts
    ├── bookings.service.ts
    ├── timeSlots.service.ts
    └── users.service.ts
```

## Rutas

| Ruta | Auth | Descripción |
|------|------|-------------|
| `/` | ❌ | Home |
| `/login` | ❌ | Login |
| `/register` | ❌ | Registro |
| `/dashboard` | ✅ | Dashboard usuario |
| `/admin` | ✅ (admin) | Panel admin |

## Hooks

### useQuery

```tsx
const query = useQuery(() => api.get('/endpoint'));
// query.state: 'idle' | 'loading' | 'success' | 'error'
// query.data
// query.error
// query.refetch()
```

### useMutation

```tsx
const mutation = useMutation(api.post('/endpoint'));
// mutation.state
// mutation.execute(body)
// mutation.reset()
```

### useAuth

```tsx
const { isAuthenticated, user, setToken, logout } = useAuth();
```

## Servicios

### authService
```ts
login(email, password)
register(name, email, password)
loadSession()
```

### usersService
```ts
getCurrentUser()
updateUser(data)
deleteUser()
```

### timeSlotsService
```ts
getTimeSlots(params?)  // { page, pageSize, startAfter, ... }
getTimeSlotById(id)
```

### bookingsService
```ts
getMyBookings()
getBookingById(id)
createBooking(timeSlotId)
deleteBooking(id)
```

## API

El wrapper `api.ts` automáticamente agrega el token JWT del localStorage:

```ts
const res = await api.post('/auth/login', { email, password });
// Headers: { Authorization: 'Bearer <token>' }
```

## Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run preview  # Preview producción
```

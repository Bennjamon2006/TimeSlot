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
├── constants/            # Constantes (mensajes, etc)
├── context/auth/         # Auth Context + Provider
├── helpers/              # Utilidades
├── hooks/                # Custom hooks
├── pages/                # Páginas
└── services/             # API services
```

## Rutas

| Ruta         | Auth       | Descripción       |
| ------------ | ---------- | ----------------- |
| `/`          | ❌         | Home              |
| `/login`     | ❌         | Login             |
| `/register`  | ❌         | Registro          |
| `/dashboard` | ✅         | Dashboard usuario |
| `/admin`     | ✅ (admin) | Panel admin       |

## QueryClient

La aplicación utiliza React Context para manejar el fetching de datos y el estado global. Incluyendo manejo de loading, errores y cache. No se utiliza una librería externa como React Query para mantener la simplicidad.

## Custom Hooks

Se han creado custom hooks para encapsular la lógica de fetching y manejo de estado. Por ejemplo:

### useQuery

```tsx
const getUsersQuery = useQuery("user-bookings", () =>
  bookingsService.getBookings(),
);
```

### useMutation

```tsx
const createBookingMutation = useMutation((data) =>
  bookingsService.createBooking(data),
);
```

### useAuth

```tsx
const { user, login, logout } = useAuth();
```

Entre otras funcionalidades, estos hooks manejan el estado de loading, errores y cache de manera centralizada, lo que simplifica el código en los componentes.

## Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run preview  # Preview producción
```

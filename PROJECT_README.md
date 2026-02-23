# Job Application Challenge

Aplicación web desarrollada en React + TypeScript para completar una prueba técnica de aplicación a posiciones de trabajo.

## 🚀 Tecnologías Utilizadas

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **shadcn/ui** - Componentes de UI
- **Lucide React** - Iconos

## 📋 Requisitos Completados

### ✅ Funcionalidades Principales

1. **Obtención de datos del candidato**
   - Input para ingresar email
   - Validación de formato de email
   - Llamada a API para obtener datos del candidato
   - Manejo de estados (loading, error, success)

2. **Lista de posiciones disponibles**
   - Obtención de posiciones desde la API
   - Visualización en cards
   - Estados de carga y error

3. **Aplicación a posiciones**
   - Input para URL del repositorio GitHub
   - Validación de URL de GitHub
   - Envío de postulación a la API
   - Feedback visual de éxito/error

### 🎨 Características de UI/UX

- ✅ Diseño limpio y profesional con shadcn/ui
- ✅ Responsive design (mobile-first)
- ✅ Loading states con spinners
- ✅ Mensajes de error descriptivos
- ✅ Feedback visual inmediato
- ✅ Estados de éxito con iconos y colores

### 🛠️ Arquitectura y Code Quality

- ✅ Context API para estado global
- ✅ Custom hooks reutilizables
- ✅ Separación de responsabilidades
- ✅ Servicios de API centralizados
- ✅ Validadores independientes
- ✅ TypeScript para type-safety
- ✅ Manejo de errores robusto
- ✅ Logs descriptivos en consola

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/nimblegravity.git

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/        # Componentes de React
│   ├── ui/           # Componentes de shadcn/ui
│   ├── CandidateForm.tsx
│   ├── JobsList.tsx
│   ├── JobItem.tsx
│   ├── ErrorMessage.tsx
│   └── LoadingSpinner.tsx
├── context/          # Context API
│   └── CandidateContext.tsx
├── hooks/            # Custom hooks
│   ├── useCandidateData.ts
│   ├── useJobs.ts
│   └── useJobApplication.ts
├── services/         # Servicios de API
│   └── api.ts
├── types/            # Definiciones de TypeScript
│   └── index.ts
└── lib/              # Utilidades
    ├── constants.ts
    ├── validators.ts
    └── utils.ts
```

## 🔌 API Endpoints Utilizados

- `GET /api/candidate/get-by-email?email={email}` - Obtener datos del candidato
- `GET /api/jobs/get-list` - Obtener lista de posiciones
- `POST /api/candidate/apply-to-job` - Enviar postulación

## 🧪 Testing Manual

### Flujo de Usuario
1. ✅ Ingresar email válido
2. ✅ Ver datos del candidato
3. ✅ Ver lista de posiciones disponibles
4. ✅ Ingresar URL de repositorio GitHub
5. ✅ Enviar postulación
6. ✅ Ver confirmación de éxito

### Validaciones Implementadas
- ✅ Formato de email válido
- ✅ Formato de URL de GitHub válido
- ✅ Campos requeridos
- ✅ Manejo de errores de API
- ✅ Manejo de errores de red

## 📝 Notas de Desarrollo

- Desarrollado con Vite + SWC para compilación ultra rápida
- Utiliza Tailwind CSS v4 con el nuevo plugin de PostCSS
- shadcn/ui configurado manualmente para máximo control
- Custom hooks para lógica reutilizable
- API service centralizado con manejo robusto de errores

## 👨‍💻 Autor

Desarrollado como prueba técnica para aplicación a posición de Fullstack Developer.

## 📄 Licencia

Este proyecto fue creado como parte de una prueba técnica.

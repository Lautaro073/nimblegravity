# NimbleGravity — Prueba Técnica

Aplicación web para postularse a posiciones de trabajo. Permite identificarse como candidato mediante email, visualizar las posiciones disponibles y enviar una postulación con la URL de un repositorio de GitHub.

## Demo

![preview](https://img.shields.io/badge/status-funcional-brightgreen)

## Stack

- **React 19** + **TypeScript**
- **Vite** con SWC
- **Tailwind CSS v4**
- **shadcn/ui** (Button, Card, Input, Alert, Badge, Tooltip)
- **react-i18next** (ES / EN)
- **Radix UI** primitives
- **lucide-react** para íconos

## Funcionalidades

- 🔍 Búsqueda de candidato por email
- 📋 Listado de posiciones disponibles desde la API
- 📤 Envío de postulación con URL de repositorio de GitHub
- 🌙 Dark mode (persiste en localStorage)
- 🌐 Internacionalización español / inglés
- ✅ Validación de URLs de GitHub
- 💬 Tooltips en botones e íconos

## Estructura del proyecto

```
src/
├── components/
│   ├── ui/              # Componentes base (shadcn/ui)
│   ├── CandidateForm    # Formulario de identificación
│   ├── JobsList         # Lista de posiciones
│   ├── JobItem          # Card de cada posición
│   └── FloatingButtons  # Dark mode + idioma
├── hooks/
│   ├── useCandidateData # Lógica de fetch del candidato
│   ├── useCandidate     # Consumer del contexto
│   ├── useJobs          # Fetch de posiciones
│   ├── useJobApplication# Envío de postulación
│   └── useTheme         # Toggle dark/light mode
├── context/             # CandidateContext (React Context)
├── services/api.ts      # Servicio HTTP centralizado
├── i18n/                # Configuración i18next + locales
├── lib/                 # Utilidades, validadores, constantes
└── types/               # Interfaces TypeScript
```

## API

Base URL: `https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/candidate/get-by-email?email=` | Obtener datos del candidato |
| GET | `/api/jobs/get-list` | Listar posiciones disponibles |
| POST | `/api/candidate/apply-to-job` | Enviar postulación |

## Setup

```bash
# Clonar el repositorio
git clone https://github.com/Lautaro073/nimblegravity.git

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## Autor

Lautaro Jimenez — [lautarojimenez02@gmail.com](mailto:lautarojimenez02@gmail.com)

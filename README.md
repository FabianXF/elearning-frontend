# 📚 E-Learning Platform - Frontend

Plataforma de aprendizaje en línea desarrollada con React que permite a estudiantes, docentes y administradores gestionar cursos, evaluaciones y foros de discusión.

## 🎯 Descripción del Proyecto

Este es el frontend de una plataforma e-learning completa que conecta con un backend REST API. La aplicación permite:

- **Estudiantes**: Inscribirse en cursos, realizar evaluaciones, participar en foros y descargar certificados
- **Docentes**: Crear y gestionar cursos, subir materiales, crear evaluaciones y moderar foros
- **Administradores**: Gestionar usuarios, monitorear la plataforma y moderar contenido

## 🚀 Tecnologías Utilizadas

- **React 18** - Biblioteca principal para la interfaz de usuario
- **React Router DOM** - Navegación entre páginas
- **Axios** - Cliente HTTP para comunicación con el backend
- **Tailwind CSS** - Framework de estilos (si aplica)
- **Context API** - Manejo de estado global (autenticación)

## 📁 Estructura del Proyecto

```
src/
├── api/                      # Configuración de API
│   ├── client.js            # Cliente Axios configurado
│   ├── endpoints.js         # Definición de endpoints
│   └── services/            # Servicios por módulo
│       ├── evaluationService.js
│       └── forumService.js
├── components/              # Componentes reutilizables
│   ├── MainLayout.jsx      # Layout principal con navegación
│   └── ProtectedRoute.jsx  # Rutas protegidas por autenticación
├── context/                 # Context API
│   └── AuthContext.jsx     # Contexto de autenticación
├── pages/                   # Páginas de la aplicación
│   ├── Dashboard.jsx       # Panel principal
│   ├── CourseList.jsx      # Lista de cursos
│   ├── CourseDetail.jsx    # Detalle de curso
│   ├── CommunityPage.jsx   # Lista de foros
│   ├── ForumDetail.jsx     # Detalle de foro con mensajes
│   ├── EvaluationTaker.jsx # Realizar evaluación
│   ├── ProgressPage.jsx    # Progreso del estudiante
│   ├── CertificatesPage.jsx # Certificados obtenidos
│   ├── ProfilePage.jsx     # Perfil de usuario
│   ├── teacher/            # Páginas de docente
│   │   ├── TeacherDashboard.jsx
│   │   ├── CourseEditor.jsx
│   │   ├── EvaluationCreator.jsx
│   │   └── GradingPanel.jsx
│   └── admin/              # Páginas de administrador
│       ├── AdminDashboard.jsx
│       └── UserManagement.jsx
└── App.js                   # Configuración de rutas
```

## 🔧 Instalación y Configuración

### Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn
- Backend corriendo en `http://localhost:8080`

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/FabianXF/elearning-frontend.git
cd elearning-frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar la URL del backend**

Editar `src/api/client.js` y verificar que la `baseURL` apunte al backend:
```javascript
baseURL: 'http://localhost:8080/api'
```

4. **Iniciar el servidor de desarrollo**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 👥 Roles y Funcionalidades

### 🎓 Estudiante

- **Cursos**
  - Ver catálogo de cursos disponibles
  - Inscribirse en cursos
  - Acceder a materiales (videos, PDFs, etc.)
  - Descargar materiales
  - Marcar materiales como vistos

- **Evaluaciones**
  - Realizar evaluaciones con límite de tiempo
  - Ver resultados y calificaciones
  - Historial de evaluaciones completadas

- **Foros**
  - Ver foros de cursos inscritos
  - Publicar mensajes en foros
  - Participar en discusiones

- **Progreso**
  - Ver progreso por curso
  - Estadísticas de materiales completados
  - Descargar certificados al completar cursos

### 👨‍🏫 Docente

- **Gestión de Cursos**
  - Crear nuevos cursos
  - Editar información de cursos
  - Subir materiales (videos, documentos, imágenes)
  - Organizar contenido en módulos

- **Evaluaciones**
  - Crear evaluaciones con preguntas de opción múltiple
  - Configurar duración y fecha límite
  - Ver resultados de estudiantes
  - Panel de calificaciones

- **Foros**
  - Crear foros de discusión
  - Moderar mensajes (eliminar contenido inapropiado)
  - Participar en discusiones

- **Reportes**
  - Generar reportes de progreso de estudiantes
  - Estadísticas de cursos

### 👨‍💼 Administrador

- **Gestión de Usuarios**
  - Ver lista de todos los usuarios
  - Editar información de usuarios
  - Cambiar roles (estudiante, docente, admin)
  - Desactivar/activar usuarios

- **Monitoreo**
  - Dashboard con estadísticas generales
  - Total de usuarios por rol
  - Total de cursos activos
  - Actividad de la plataforma

- **Moderación**
  - Eliminar mensajes en foros
  - Gestionar contenido reportado

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación:

1. El usuario inicia sesión con email y contraseña
2. El backend devuelve un token JWT
3. El token se almacena en `localStorage`
4. Todas las peticiones incluyen el token en el header `Authorization: Bearer <token>`
5. El `AuthContext` maneja el estado de autenticación global

### Rutas Protegidas

Las rutas están protegidas según el rol del usuario:
- `/dashboard` - Accesible para todos los usuarios autenticados
- `/teacher/*` - Solo para docentes
- `/admin/*` - Solo para administradores

## 📡 Integración con el Backend

### Endpoints Principales

```javascript
// Autenticación
POST /api/auth/login
POST /api/auth/register

// Cursos
GET /api/cursos
GET /api/cursos/:id
POST /api/cursos/:id/inscribirse
GET /api/cursos/:id/materiales

// Evaluaciones
GET /api/evaluaciones/:id
POST /api/evaluaciones/:id/submit
GET /api/evaluaciones/:id/results

// Foros
GET /api/foros/mis-foros
GET /api/foros/:id
POST /api/foros/:id/mensajes
DELETE /api/foros/mensajes/:id

// Progreso
GET /api/progreso/:idCurso
POST /api/progreso/:idCurso/material/:idMaterial

// Certificados
GET /api/certificados/:idCurso
```

### Manejo de Errores

El cliente Axios está configurado con interceptores para:
- Agregar automáticamente el token de autenticación
- Manejar errores 401 (no autorizado) redirigiendo al login
- Configurar headers apropiados para FormData

## 🎨 Características Implementadas

### ✅ Panel de Comunidad
- Lista de foros de cursos inscritos
- Navegación a foros individuales
- Estados de carga y error
- Validación robusta de datos del backend

### ✅ Detalle de Foro
- Visualización de mensajes con nombre de usuario
- Publicar nuevos mensajes
- Eliminar mensajes (solo docentes y admin)
- Actualización automática después de acciones

### ✅ Sistema de Evaluaciones
- Carga de evaluaciones con preguntas y opciones
- Timer con cuenta regresiva
- Envío de respuestas en formato correcto
- Visualización de resultados con porcentaje
- Prevención de re-envío de evaluaciones completadas

### ✅ Gestión de Materiales
- Descarga de archivos
- Marcado de materiales como vistos
- Seguimiento de progreso

## 🐛 Solución de Problemas Comunes

### Error: "No routes matched location"
**Causa**: Ruta no definida en `App.js`  
**Solución**: Verificar que la ruta exista en el archivo de rutas

### Error: "Objects are not valid as a React child"
**Causa**: Intentar renderizar un objeto en lugar de una propiedad  
**Solución**: Acceder a la propiedad específica (ej: `option.texto` en lugar de `option`)

### Error 403 al eliminar mensajes
**Causa**: El usuario no tiene permisos (solo docentes y admin)  
**Solución**: Verificar el rol del usuario en el backend

### Error 404 en endpoints
**Causa**: Backend no está corriendo o URL incorrecta  
**Solución**: Verificar que el backend esté en `http://localhost:8080`

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm start          # Inicia servidor de desarrollo en puerto 3000

# Producción
npm run build      # Genera build optimizado para producción

# Testing
npm test           # Ejecuta tests (si están configurados)

# Linting
npm run lint       # Verifica código (si está configurado)
```

## 🤝 Contribución

Para contribuir al proyecto:

1. Crear una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Hacer commits descriptivos: `git commit -m "Agregar funcionalidad X"`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Crear un Pull Request

## 📄 Licencia

Este proyecto es parte de un trabajo académico para la materia de Tecnología Web.

## 👨‍💻 Autores

- **Equipo de Desarrollo** - Proyecto E-Learning 7° Semestre

## 📞 Soporte

Para preguntas o problemas, contactar al equipo de desarrollo o crear un issue en GitHub.

---

**Última actualización**: Noviembre 2025

# FastFood Admin - Sistema de Gestión para Restaurantes de Comida Rápida

## 🚀 Estado del Proyecto
**Fase de Desarrollo Activo** - Versión 0.1.0

## 📋 Descripción
Sistema administrativo para restaurantes de comida rápida que permite gestionar productos, categorías, inventario y próximamente ventas, empleados y finanzas.

## 🛠️ Tecnologías Utilizadas
- **Frontend**: React 18 + TypeScript
- **Estilos**: TailwindCSS
- **Ruteo**: React Router DOM
- **Peticiones HTTP**: Axios
- **Backend**: API REST (en desarrollo)

## ✨ Módulos Implementados

### ✅ Completados
- Autenticación de administradores
- Gestión de productos (CRUD)
- Gestión de categorías (CRUD)
- Dashboard básico
- Barra de navegación inferior para admin

### 🚧 En Desarrollo
- Gestión de inventario avanzado
- Alertas de stock mínimo
- Módulo de ventas
- Reportes básicos
- Gestión de empleados

### 📅 Próximamente
- Módulo de finanzas
- Reportes avanzados
- Múltiples roles de usuario
- Historial de acciones

## 📁 Estructura del Proyecto
frontend/
├── src/
│   ├── components/           # Componentes reutilizables
│   ├── pages/                # Páginas de la aplicación
│   │   ├── admin/            # Módulo administrador
│   │   └── auth/             # Autenticación
│   ├── services/             # Conexión con API
│   ├── types/                # Tipos de TypeScript
│   └── utils/                # Utilidades
├── public/                   # Archivos estáticos
└── package.json

## ⚙️ Instalación

1. Clonar el repositorio
```bash```
git clone [url-del-repositorio]
cd frontend

2. Instalar dependencias
npm install

3. Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de tu API

4. Iniciar servidor de desarrollo
npm run dev

📦 Dependencias Principales
{
  "react": "^18.2.0",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "tailwindcss": "^3.x"
}

Licencia
Todos los derechos reservados © 2026

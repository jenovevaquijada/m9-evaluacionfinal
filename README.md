# 🚀 Mi Tienda E-commerce Fullstack

Este es un proyecto de tienda virtual desarrollado con una arquitectura robusta, conectando un frontend dinámico con un backend en Node.js y una base de datos relacional en PostgreSQL.
> "Construyendo experiencias digitales desde la empatía y la creatividad."

## 🛠️ Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3 (Grid & Flexbox), JavaScript (Fetch API).
* **Backend:** Node.js, Express.
* **Base de Datos:** PostgreSQL.
* **Autenticación:** JSON Web Tokens (JWT).
* **REST API** con arquitectura MVC.
* **Transacciones SQL** para integridad de datos.

## 🌟 Características Principales

* **Gestión de Inventario:** El sistema descuenta automáticamente el stock de la base de datos tras cada compra exitosa.
* **Transacciones SQL:** Implementación de `BEGIN`, `COMMIT` y `ROLLBACK` para asegurar que las ventas y el stock se procesen correctamente o no se procesen en absoluto ante errores.
* **Autenticación Protegida:** Rutas de compra protegidas por middleware que verifica el token del usuario.
* **Interfaz Responsiva:** Diseño limpio y alineado mediante CSS Grid, optimizado para la experiencia del usuario.

## 🆙 Actualizaciones respecto a la entrega del Módulo 8
* Transacciones SQL: Implementación de transacciones atómicas para asegurar que el stock se descuente solo si el pago es procesado exitosamente.
* Historial de Compras: "Nueva vista dinámica para que los usuarios registrados consulten su actividad histórica."
* Arquitectura MVC: "Migración de un servidor plano a una estructura de carpetas profesional (Routes, Controllers, Config)."
* Feedback en tiempo real: Uso de Toasts para confirmar acciones.
* Estados de Carga: Botones que cambian a "Procesando..." para evitar errores del usuario.
* Validaciones: Formit de login con validación de campos vacíos y formato de correo.

## 🏗️ Arquitectura del Proyecto (MVC)

El proyecto sigue el patrón **Modelo-Vista-Controlador** para asegurar la escalabilidad:

```text
/m9-evaluacionfinal
├── /src
│   ├── /config       # Conexión a PostgreSQL
│   ├── /controllers  # Lógica de negocio (Ventas, Auth, Productos)
│   ├── /routes       # Definición de Endpoints API
│   ├── /middleware   # Seguridad y validación de Tokens
│   └── server.js      # Punto de entrada del servidor
├── /public
│   ├── /css          # Estilos optimizados
│   ├── /js           # Lógica del cliente
│   └── index.html     # Estructura principal
└── README.md
```

## 📂 Estructura de la Base de Datos

El proyecto utiliza una base de datos con las siguientes relaciones:
* `articulos`: Almacena nombre, precio, stock y URL de imagen.
* `ventas`: Registra el historial de compras vinculado a cada cliente.
* `usuarios`: Gestión de perfiles para acceso seguro.

## 🚀 Instalación y Uso

1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar dependencias.
3. Configurar las credenciales de PostgreSQL en el archivo de configuración.
4. Iniciar el servidor con `node src/server.js`.
5. Abrir `index.html` en el navegador.

---

## 👩🏻‍💻 Autora
Jenoveva Quijada
> *Diseñadora Gráfica & Full Stack Developer Trainee*

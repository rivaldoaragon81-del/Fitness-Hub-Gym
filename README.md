# 🏋️ Fitness Hub Gym

## Sistema de Gestión de Gimnasio

Fitness Hub Gym es una aplicación web desarrollada para facilitar la gestión administrativa de un gimnasio.

El sistema permite al personal encargado gestionar socios, registrar pagos y controlar asistencias, además de visualizar información importante mediante un Dashboard.

---

## 🎯 Objetivo del proyecto

El objetivo de Fitness Hub Gym es centralizar la información relacionada con los socios del gimnasio y facilitar las principales tareas administrativas.

La aplicación busca mejorar el control de:

- Socios
- Membresías
- Pagos
- Asistencias

Todo desde una interfaz web sencilla y organizada.

---

## 🚀 Funcionalidades

### 🔐 Inicio de sesión

El sistema cuenta con un acceso para el personal del gimnasio.

- Usuario y contraseña.
- Validación de credenciales.
- Opción "Recordarme".
- Redirección al Dashboard después del inicio de sesión.

### 👥 Gestión de socios

Permite administrar la información de los miembros del gimnasio.

- Registrar socios.
- Generar código de socio.
- Registrar nombres y apellidos.
- Registrar DNI.
- Registrar teléfono.
- Registrar correo electrónico.
- Seleccionar plan de membresía.
- Registrar fecha de inicio.
- Registrar fecha de vencimiento.
- Consultar estado del socio.
- Buscar socios.
- Editar socios.
- Eliminar socios.

### 💳 Gestión de pagos

Permite registrar y consultar los pagos realizados por los socios.

- Selección del socio.
- Plan de membresía automático.
- Monto automático según el plan.
- Fecha de pago.
- Método de pago.
- Historial de pagos.
- Búsqueda de pagos.
- Eliminación de pagos.

#### Métodos de pago

- Efectivo
- Yape
- Plin
- Tarjeta

### 🕐 Control de asistencia

Permite llevar un registro de las asistencias de los socios.

- Registrar asistencia.
- Seleccionar socio.
- Fecha automática.
- Hora automática.
- Generar código de asistencia.
- Consultar historial.
- Buscar asistencias.
- Eliminar registros.

### 📊 Dashboard

El Dashboard presenta indicadores generales del gimnasio:

- Total de socios.
- Socios activos.
- Socios vencidos.
- Socios con plan Premium.
- Ingresos totales.
- Asistencias del día.

---

## 🛠️ Tecnologías utilizadas

- **Next.js**
- **React**
- **TypeScript**
- **Material UI (MUI)**
- **Tabler Icons**
- **HTML**
- **CSS**
- **JavaScript**

---

## 💾 Almacenamiento

Para este proyecto se utiliza el almacenamiento del navegador mediante:

- `localStorage`
- `sessionStorage`

Estos mecanismos permiten conservar la información registrada mientras se utiliza la aplicación.

> El almacenamiento local se utiliza con fines académicos y demostrativos. Para una aplicación real se recomienda implementar un backend y una base de datos.

---

## 📁 Estructura principal del proyecto

```text
src/
└── app/
    │
    ├── authentication/
    │   ├── login/
    │   ├── auth/
    │   └── register/
    │
    └── (DashboardLayout)/
        │
        ├── asistencia/
        │   ├── components/
        │   ├── models/
        │   └── services/
        │
        ├── pagos/
        │   ├── components/
        │   ├── models/
        │   └── services/
        │
        ├── socios/
        │   ├── components/
        │   ├── models/
        │   └── services/
        │
        ├── components/
        │   └── dashboard/
        │       └── gimnasio/
        │
        └── layout/
            └── sidebar/
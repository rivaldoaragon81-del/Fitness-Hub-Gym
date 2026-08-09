"use client";

import { useEffect, useState } from "react";

import { Socio } from "../models/socio";

import {
  obtenerSocios,
  guardarSocios,
  generarCodigo,
  actualizarSocio,
} from "../services/socioService";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

import {
  Stack,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

interface FormularioSocioProps {

  socioSeleccionado: Socio | null;

  cargarSocios: () => void;

  limpiarSeleccion: () => void;

}

export default function FormularioSocio({

  socioSeleccionado,

  cargarSocios,

  limpiarSeleccion,

}: FormularioSocioProps) {

  const [nombres, setNombres] = useState("");

  const [apellidos, setApellidos] = useState("");

  const [dni, setDni] = useState("");

  const [telefono, setTelefono] = useState("");

  const [correo, setCorreo] = useState("");

  const [plan, setPlan] = useState("");

  const [fechaInicio, setFechaInicio] = useState("");

  const [editando, setEditando] = useState(false);

  const hoy = new Date().toISOString().split("T")[0];

  useEffect(() => {

    if (!socioSeleccionado) return;

    setNombres(socioSeleccionado.nombres);

    setApellidos(socioSeleccionado.apellidos);

    setDni(socioSeleccionado.dni);

    setTelefono(socioSeleccionado.telefono);

    setCorreo(socioSeleccionado.correo);

    setPlan(socioSeleccionado.plan);

    setFechaInicio(socioSeleccionado.fechaInicio);

    setEditando(true);

  }, [socioSeleccionado]);
    const registrarSocio = () => {

    if (nombres.trim() === "") {
      alert("Ingrese los nombres.");
      return;
    }

    if (apellidos.trim() === "") {
      alert("Ingrese los apellidos.");
      return;
    }

    if (dni.length !== 8) {
      alert("El DNI debe tener 8 dígitos.");
      return;
    }

    if (telefono.length !== 9) {
      alert("El teléfono debe tener 9 dígitos.");
      return;
    }

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correo)) {
      alert("Ingrese un correo válido.");
      return;
    }

    if (plan === "") {
      alert("Seleccione un plan.");
      return;
    }

    if (fechaInicio === "") {
      alert("Seleccione la fecha de inicio.");
      return;
    }

    const fecha = new Date(fechaInicio);

    switch (plan) {

      case "Básico":
        fecha.setMonth(fecha.getMonth() + 1);
        break;

      case "Intermedio":
        fecha.setMonth(fecha.getMonth() + 3);
        break;

      case "Premium":
        fecha.setFullYear(fecha.getFullYear() + 1);
        break;

    }

    const fechaVencimiento =
      fecha.toISOString().split("T")[0];

    if (editando && socioSeleccionado) {

      actualizarSocio({

        ...socioSeleccionado,

        nombres,
        apellidos,
        dni,
        telefono,
        correo,
        plan,
        fechaInicio,
        fechaVencimiento,

      });

      alert("Socio actualizado correctamente.");

    } else {

      const socios = obtenerSocios();

      const nuevoSocio: Socio = {

        codigo: generarCodigo(socios),

        nombres,

        apellidos,

        dni,

        telefono,

        correo,

        plan,

        fechaInicio,

        fechaVencimiento,

        estado: "Activo",

      };

      socios.push(nuevoSocio);

      guardarSocios(socios);

      alert("Socio registrado correctamente.");

    }

    cargarSocios();

    limpiarSeleccion();

    setEditando(false);

    setNombres("");

    setApellidos("");

    setDni("");

    setTelefono("");

    setCorreo("");

    setPlan("");

    setFechaInicio("");

  };
    return (

    <DashboardCard
      title={editando ? "Editar Socio" : "Registro de Socios"}
    >

      <Stack spacing={3}>

        <TextField
          label="Nombres"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
          fullWidth
        />

        <TextField
          label="Apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          fullWidth
        />

        <TextField
          label="DNI"
          value={dni}
          inputProps={{ maxLength: 8 }}
          onChange={(e) => {

            const valor = e.target.value;

            if (/^\d*$/.test(valor)) {

              setDni(valor);

            }

          }}
          fullWidth
        />

        <TextField
          label="Teléfono"
          value={telefono}
          inputProps={{ maxLength: 9 }}
          onChange={(e) => {

            const valor = e.target.value;

            if (/^\d*$/.test(valor)) {

              setTelefono(valor);

            }

          }}
          fullWidth
        />

        <TextField
          label="Correo Electrónico"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          fullWidth
        >
          <MenuItem value="">
            Seleccione un plan
          </MenuItem>

          <MenuItem value="Básico">
            Básico
          </MenuItem>

          <MenuItem value="Intermedio">
            Intermedio
          </MenuItem>

          <MenuItem value="Premium">
            Premium
          </MenuItem>

        </TextField>

        <TextField
          label="Fecha de Inicio"
          type="date"
          value={fechaInicio}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: hoy,
          }}
          onChange={(e) => setFechaInicio(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          size="large"
          onClick={registrarSocio}
        >
          {editando
            ? "Actualizar Socio"
            : "Registrar Socio"}
        </Button>

      </Stack>

    </DashboardCard>

  );

}
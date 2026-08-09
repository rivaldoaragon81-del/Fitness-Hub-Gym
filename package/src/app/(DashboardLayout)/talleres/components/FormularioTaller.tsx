"use client";

import { useState } from "react";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

import {
  Stack,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import {
  obtenerTalleres,
  guardarTalleres,
  generarCodigoTaller,
  CAPACIDAD_TALLER,
} from "../services/tallerService";

export default function FormularioTaller() {

  const [nombre, setNombre] = useState("");
  const [instructor, setInstructor] = useState("");
  const [dia, setDia] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  const registrarTaller = () => {

    if (nombre.trim() === "") {
      alert("Ingrese el nombre del taller.");
      return;
    }

    if (instructor.trim() === "") {
      alert("Ingrese el instructor.");
      return;
    }

    if (dia === "") {
      alert("Seleccione un día.");
      return;
    }

    if (horaInicio === "") {
      alert("Seleccione la hora de inicio.");
      return;
    }

    if (horaFin === "") {
      alert("Seleccione la hora de finalización.");
      return;
    }

    const talleres = obtenerTalleres();

    const nuevoTaller = {
      codigo: generarCodigoTaller(talleres),

      nombre,

      instructor,

      dia,

      horaInicio,

      horaFin,

      capacidad: CAPACIDAD_TALLER,

      inscritos: 0,
      sociosInscritos: [],
    };

    talleres.push(nuevoTaller);

    guardarTalleres(talleres);

    alert("Taller registrado correctamente.");

    setNombre("");
    setInstructor("");
    setDia("");
    setHoraInicio("");
    setHoraFin("");
  };

  return (

    <DashboardCard title="Registrar Taller">

      <Stack spacing={3}>

        <TextField
          label="Nombre del Taller"
          placeholder="Ej. Baile"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
          fullWidth
        />

        <TextField
          label="Instructor"
          placeholder="Nombre del instructor"
          value={instructor}
          onChange={(e) =>
            setInstructor(e.target.value)
          }
          fullWidth
        />

        <TextField
          select
          label="Día"
          value={dia}
          onChange={(e) =>
            setDia(e.target.value)
          }
          fullWidth
        >

          <MenuItem value="">
            Seleccione un día
          </MenuItem>

          <MenuItem value="Lunes">
            Lunes
          </MenuItem>

          <MenuItem value="Martes">
            Martes
          </MenuItem>

          <MenuItem value="Miércoles">
            Miércoles
          </MenuItem>

          <MenuItem value="Jueves">
            Jueves
          </MenuItem>

          <MenuItem value="Viernes">
            Viernes
          </MenuItem>

          <MenuItem value="Sábado">
            Sábado
          </MenuItem>

        </TextField>

        <TextField
          label="Hora de Inicio"
          type="time"
          value={horaInicio}
          onChange={(e) =>
            setHoraInicio(e.target.value)
          }
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />

        <TextField
          label="Hora de Fin"
          type="time"
          value={horaFin}
          onChange={(e) =>
            setHoraFin(e.target.value)
          }
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />

        <TextField
          label="Capacidad"
          value={CAPACIDAD_TALLER}
          disabled
          fullWidth
        />

        <Button
          variant="contained"
          size="large"
          onClick={registrarTaller}
        >
          Registrar Taller
        </Button>

      </Stack>

    </DashboardCard>
  );
}
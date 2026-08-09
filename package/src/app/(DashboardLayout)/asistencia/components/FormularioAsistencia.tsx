"use client";

import { useEffect, useState } from "react";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

import {
  Stack,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import { Socio } from "../../socios/models/socio";
import { obtenerSocios } from "../../socios/services/socioService";

import { Asistencia } from "../models/asistencia";

import {
  obtenerAsistencias,
  guardarAsistencias,
  generarCodigoAsistencia,
} from "../services/asistenciaService";

export default function FormularioAsistencia() {

  const [socios, setSocios] = useState<Socio[]>([]);

  const [codigoSocio, setCodigoSocio] = useState("");

  const [nombreSocio, setNombreSocio] = useState("");

  const fecha = new Date().toISOString().split("T")[0];

  const hora = new Date().toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {

    setSocios(obtenerSocios());

  }, []);

  const registrarAsistencia = () => {

    if (codigoSocio === "") {

      alert("Seleccione un socio.");

      return;

    }

    const asistencias = obtenerAsistencias();

    const nueva: Asistencia = {

      codigo: generarCodigoAsistencia(asistencias),

      codigoSocio,

      nombreSocio,

      fecha,

      hora,

    };

    asistencias.push(nueva);

    guardarAsistencias(asistencias);

    alert("Asistencia registrada correctamente.");

    window.location.reload();

  };

  return (

    <DashboardCard title="Registrar Asistencia">

      <Stack spacing={3}>

        <TextField
          select
          label="Socio"
          value={codigoSocio}
          onChange={(e) => {

            const codigo = e.target.value;

            setCodigoSocio(codigo);

            const socio = socios.find(
              (s) => s.codigo === codigo
            );

            if (socio) {

              setNombreSocio(
                socio.nombres + " " + socio.apellidos
              );

            }

          }}
          fullWidth
        >

          <MenuItem value="">
            Seleccione un socio
          </MenuItem>

          {socios.map((socio) => (

            <MenuItem
              key={socio.codigo}
              value={socio.codigo}
            >

              {socio.codigo} - {socio.nombres} {socio.apellidos}

            </MenuItem>

          ))}

        </TextField>

        <TextField
          label="Nombre del Socio"
          value={nombreSocio}
          fullWidth
          disabled
        />

        <TextField
          label="Fecha"
          value={fecha}
          fullWidth
          disabled
        />

        <TextField
          label="Hora"
          value={hora}
          fullWidth
          disabled
        />

        <Button
          variant="contained"
          onClick={registrarAsistencia}
        >
          Registrar Asistencia
        </Button>

      </Stack>

    </DashboardCard>

  );

}
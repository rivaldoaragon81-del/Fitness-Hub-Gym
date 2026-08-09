"use client";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

import {
  Typography,
  Stack,
} from "@mui/material";

export default function FormularioHorario() {

  return (
    <DashboardCard title="Control de Horarios">

      <Stack spacing={2}>

        <Typography variant="body1">
          Cada turno tiene una capacidad máxima de 10 socios.
        </Typography>

        <Typography variant="body2" color="textSecondary">
          La cantidad de socios ocupados se actualiza
          automáticamente según los socios registrados.
        </Typography>

      </Stack>

    </DashboardCard>
  );
}
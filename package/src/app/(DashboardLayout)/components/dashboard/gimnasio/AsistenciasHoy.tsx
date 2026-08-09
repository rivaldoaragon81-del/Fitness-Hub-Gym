"use client";

import { useEffect, useState } from "react";

import DashboardCard from "../../shared/DashboardCard";

import { Typography } from "@mui/material";

import { obtenerAsistencias } from "@/app/(DashboardLayout)/asistencia/services/asistenciaService";

export default function AsistenciasHoy() {

  const [total, setTotal] = useState(0);

  useEffect(() => {

    const asistencias = obtenerAsistencias();

    const hoy = new Date()
      .toISOString()
      .split("T")[0];

    const asistenciasHoy = asistencias.filter(
      (asistencia) => asistencia.fecha === hoy
    );

    setTotal(asistenciasHoy.length);

  }, []);

  return (

    <DashboardCard title="Asistencias de Hoy">

      <Typography
        variant="h3"
        color="primary.main"
      >
        {total}
      </Typography>

    </DashboardCard>

  );

}
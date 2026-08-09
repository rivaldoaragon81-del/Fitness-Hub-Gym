"use client";

import { useEffect, useState } from "react";
import DashboardCard from "../../shared/DashboardCard";
import { Typography } from "@mui/material";

export default function SociosActivos() {

  const [activos, setActivos] = useState(0);

  useEffect(() => {

    const datos = localStorage.getItem("socios");

    if (!datos) return;

    const socios = JSON.parse(datos);

    const cantidad = socios.filter(
      (socio: any) => socio.estado === "Activo"
    ).length;

    setActivos(cantidad);

  }, []);

  return (

    <DashboardCard title="✅ Socios Activos">

      <Typography
        variant="h3"
        align="center"
        sx={{ mt: 2 }}
      >
        {activos}
      </Typography>

    </DashboardCard>

  );

}
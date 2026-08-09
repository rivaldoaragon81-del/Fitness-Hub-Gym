"use client";

import { useEffect, useState } from "react";
import DashboardCard from "../../shared/DashboardCard";
import { Typography } from "@mui/material";

export default function SociosVencidos() {

  const [vencidos, setVencidos] = useState(0);

  useEffect(() => {

    const datos = localStorage.getItem("socios");

    if (!datos) return;

    const socios = JSON.parse(datos);

    const cantidad = socios.filter(
      (socio: any) => socio.estado === "Vencido"
    ).length;

    setVencidos(cantidad);

  }, []);

  return (

    <DashboardCard title="❌ Socios Vencidos">

      <Typography
        variant="h3"
        align="center"
        sx={{ mt: 2 }}
      >
        {vencidos}
      </Typography>

    </DashboardCard>

  );

}
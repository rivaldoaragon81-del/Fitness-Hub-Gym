"use client";

import { useEffect, useState } from "react";
import DashboardCard from "../../shared/DashboardCard";
import { Typography } from "@mui/material";

export default function TotalSocios() {

  const [total, setTotal] = useState(0);

  useEffect(() => {

    const datos = localStorage.getItem("socios");

    if (datos) {

      const socios = JSON.parse(datos);

      setTotal(socios.length);

    }

  }, []);

  return (

    <DashboardCard title="👥 Total de Socios">

      <Typography
        variant="h3"
        align="center"
        sx={{ mt: 2 }}
      >
        {total}
      </Typography>

    </DashboardCard>

  );

}
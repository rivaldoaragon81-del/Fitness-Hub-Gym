"use client";

import DashboardCard from "../../shared/DashboardCard";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { obtenerPagos } from "@/app/(DashboardLayout)/pagos/services/pagoService";

export default function IngresosTotales() {

  const [total, setTotal] = useState(0);

  useEffect(() => {

    const pagos = obtenerPagos();

    const suma = pagos.reduce(
      (acumulador, pago) => acumulador + pago.monto,
      0
    );

    setTotal(suma);

  }, []);

  return (

    <DashboardCard title="Ingresos Totales">

      <Typography
        variant="h3"
        color="success.main"
      >
        S/. {total}
      </Typography>

    </DashboardCard>

  );

}
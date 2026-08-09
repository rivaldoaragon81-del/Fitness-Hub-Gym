"use client";

import { useEffect, useState } from "react";

import DashboardCard from "../../shared/DashboardCard";

import { Typography } from "@mui/material";

import { obtenerSocios } from "@/app/(DashboardLayout)/socios/services/socioService";

export default function PlanPremium() {

  const [total, setTotal] = useState(0);

  useEffect(() => {

    const socios = obtenerSocios();

    const premium = socios.filter(
      (socio) =>
        socio.plan.trim().toLowerCase() === "premium"
    );

    setTotal(premium.length);

  }, []);

  return (

    <DashboardCard title="Plan Premium">

      <Typography
        variant="h3"
        color="warning.main"
      >
        {total}
      </Typography>

      <Typography
        variant="subtitle1"
        color="textSecondary"
      >
        Socios con plan Premium
      </Typography>

    </DashboardCard>

  );

}
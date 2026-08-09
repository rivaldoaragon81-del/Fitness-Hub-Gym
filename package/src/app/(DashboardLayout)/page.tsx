"use client";

import { Grid, Box } from "@mui/material";

import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

import TotalSocios from "@/app/(DashboardLayout)/components/dashboard/gimnasio/TotalSocios";
import SociosActivos from "@/app/(DashboardLayout)/components/dashboard/gimnasio/SociosActivos";
import SociosVencidos from "@/app/(DashboardLayout)/components/dashboard/gimnasio/SociosVencidos";
import PlanPremium from "@/app/(DashboardLayout)/components/dashboard/gimnasio/PlanPremium";
import IngresosTotales from "@/app/(DashboardLayout)/components/dashboard/gimnasio/IngresosTotales";
import AsistenciasHoy from "@/app/(DashboardLayout)/components/dashboard/gimnasio/AsistenciasHoy";

const Dashboard = () => {
  return (
    <PageContainer
      title="Dashboard"
      description="Sistema de Gestión de Gimnasio"
    >
      <Box>
        <Grid container spacing={3}>

          {/* Total de socios */}
          <Grid
            size={{
              xs: 12,
              md: 6,
              lg: 4,
            }}
          >
            <TotalSocios />
          </Grid>

          {/* Socios activos */}
          <Grid
            size={{
              xs: 12,
              md: 6,
              lg: 4,
            }}
          >
            <SociosActivos />
          </Grid>

          {/* Socios vencidos */}
          <Grid
            size={{
              xs: 12,
              md: 6,
              lg: 4,
            }}
          >
            <SociosVencidos />
          </Grid>

          {/* Plan Premium */}
          <Grid
            size={{
              xs: 12,
              md: 6,
              lg: 4,
            }}
          >
            <PlanPremium />
          </Grid>

          {/* Ingresos totales */}
          <Grid
            size={{
              xs: 12,
              md: 6,
              lg: 4,
            }}
          >
            <IngresosTotales />
          </Grid>

          {/* Asistencias de hoy */}
          <Grid
            size={{
              xs: 12,
              md: 6,
              lg: 4,
            }}
          >
            <AsistenciasHoy />
          </Grid>

        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
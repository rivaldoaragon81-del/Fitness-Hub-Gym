"use client";

import { Socio } from "../models/socio";
import { eliminarSocio,} from "../services/socioService";
import { useState } from "react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TextField,
  Button,
} from "@mui/material";

interface TablaSociosProps {

  socios: Socio[];

  cargarSocios: () => void;

  seleccionarSocio: (socio: Socio) => void;

}

export default function TablaSocios({
  socios,
  cargarSocios,
  seleccionarSocio,
}: TablaSociosProps) {
  const [buscar, setBuscar] = useState("");
  const eliminar = (codigo: string) => {

    const confirmar = confirm(
      "¿Desea eliminar este socio?"
    );

    if (!confirmar) return;

    eliminarSocio(codigo);

    cargarSocios();

  };
  const sociosFiltrados = socios.filter((socio) =>

  socio.codigo.toLowerCase().includes(buscar.toLowerCase()) ||

  socio.nombres.toLowerCase().includes(buscar.toLowerCase()) ||

  socio.apellidos.toLowerCase().includes(buscar.toLowerCase()) ||

  socio.dni.includes(buscar)

);
  return (

    <DashboardCard title="Lista de Socios">

      <h2>Socios Registrados</h2>
      <br />

    <TextField
  label="Buscar socio"
  placeholder="Código, nombre, apellido o DNI"
  value={buscar}
  onChange={(e) => setBuscar(e.target.value)}
  fullWidth
  sx={{ mb: 3 }}
/>

<TableContainer component={Paper}>

  <Table>

    <TableHead>

      <TableRow>

        <TableCell><strong>Código</strong></TableCell>
        <TableCell><strong>Nombres</strong></TableCell>
        <TableCell><strong>Apellidos</strong></TableCell>
        <TableCell><strong>DNI</strong></TableCell>
        <TableCell><strong>Plan</strong></TableCell>
        <TableCell><strong>Vencimiento</strong></TableCell>
        <TableCell><strong>Estado</strong></TableCell>
        <TableCell><strong>Acciones</strong></TableCell>

      </TableRow>

    </TableHead>

    <TableBody>

      {sociosFiltrados.length === 0 ? (

        <TableRow>

          <TableCell colSpan={8} align="center">
            No hay socios registrados.
          </TableCell>

        </TableRow>

      ) : (

        sociosFiltrados.map((socio) => (

          <TableRow key={socio.codigo}>

            <TableCell>{socio.codigo}</TableCell>
            <TableCell>{socio.nombres}</TableCell>
            <TableCell>{socio.apellidos}</TableCell>
            <TableCell>{socio.dni}</TableCell>
            <TableCell>{socio.plan}</TableCell>
            <TableCell>{socio.fechaVencimiento}</TableCell>
            <TableCell>{socio.estado}</TableCell>

            <TableCell>

              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => seleccionarSocio(socio)}
              >
                Editar
              </Button>

              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ ml: 1 }}
                onClick={() => eliminar(socio.codigo)}
              >
                Eliminar
              </Button>

            </TableCell>

          </TableRow>

        ))

      )}

    </TableBody>

  </Table>

</TableContainer>
</DashboardCard>
  );
  
}
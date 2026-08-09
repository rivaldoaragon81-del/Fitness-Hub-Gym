"use client";

import { useEffect, useState } from "react";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";

import { Asistencia } from "../models/asistencia";

import {
  obtenerAsistencias,
  eliminarAsistencia,
} from "../services/asistenciaService";

export default function TablaAsistencia() {

  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);

  const [buscar, setBuscar] = useState("");

  useEffect(() => {

    cargarAsistencias();

  }, []);

  const cargarAsistencias = () => {

    setAsistencias(obtenerAsistencias());

  };

  const eliminar = (codigo: string) => {

    const confirmar = confirm(
      "¿Desea eliminar esta asistencia?"
    );

    if (!confirmar) return;

    eliminarAsistencia(codigo);

    cargarAsistencias();

  };

  const asistenciasFiltradas = asistencias.filter(
    (asistencia) =>
      asistencia.codigo
        .toLowerCase()
        .includes(buscar.toLowerCase()) ||

      asistencia.codigoSocio
        .toLowerCase()
        .includes(buscar.toLowerCase()) ||

      asistencia.nombreSocio
        .toLowerCase()
        .includes(buscar.toLowerCase()) ||

      asistencia.fecha
        .includes(buscar)
  );

  return (

    <DashboardCard title="Historial de Asistencias">

      <TextField
        label="Buscar asistencia"
        placeholder="Código, socio o fecha"
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                <strong>Código</strong>
              </TableCell>

              <TableCell>
                <strong>Socio</strong>
              </TableCell>

              <TableCell>
                <strong>Fecha</strong>
              </TableCell>

              <TableCell>
                <strong>Hora</strong>
              </TableCell>

              <TableCell>
                <strong>Acciones</strong>
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {asistenciasFiltradas.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No existen asistencias registradas.
                </TableCell>

              </TableRow>

            ) : (

              asistenciasFiltradas.map((asistencia) => (

                <TableRow
                  key={asistencia.codigo}
                >

                  <TableCell>
                    {asistencia.codigo}
                  </TableCell>

                  <TableCell>
                    {asistencia.codigoSocio} - {asistencia.nombreSocio}
                  </TableCell>

                  <TableCell>
                    {asistencia.fecha}
                  </TableCell>

                  <TableCell>
                    {asistencia.hora}
                  </TableCell>

                  <TableCell>

                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() =>
                        eliminar(asistencia.codigo)
                      }
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
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
  Chip,
} from "@mui/material";

import { Taller } from "../models/taller";

import {
  obtenerTalleres,
  eliminarTaller,
} from "../services/tallerService";

export default function TablaTalleres() {

  const [talleres, setTalleres] =
    useState<Taller[]>([]);

  const cargarTalleres = () => {

    setTalleres(obtenerTalleres());

  };

  useEffect(() => {

    cargarTalleres();

  }, []);

  const eliminar = (codigo: string) => {

    const confirmar = confirm(
      "¿Desea eliminar este taller?"
    );

    if (!confirmar) return;

    eliminarTaller(codigo);

    cargarTalleres();

  };

  return (

    <DashboardCard title="Talleres Registrados">

      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                <strong>Código</strong>
              </TableCell>

              <TableCell>
                <strong>Taller</strong>
              </TableCell>

              <TableCell>
                <strong>Instructor</strong>
              </TableCell>

              <TableCell>
                <strong>Día</strong>
              </TableCell>

              <TableCell>
                <strong>Horario</strong>
              </TableCell>

              <TableCell>
                <strong>Cupos</strong>
              </TableCell>

              <TableCell>
                <strong>Estado</strong>
              </TableCell>

              <TableCell>
                <strong>Acciones</strong>
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {talleres.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={8}
                  align="center"
                >
                  No existen talleres registrados.
                </TableCell>

              </TableRow>

            ) : (

              talleres.map((taller) => {

                const disponibles =
                  taller.capacidad -
                  taller.inscritos;

                const completo =
                  disponibles <= 0;

                return (

                  <TableRow
                    key={taller.codigo}
                  >

                    <TableCell>
                      {taller.codigo}
                    </TableCell>

                    <TableCell>
                      {taller.nombre}
                    </TableCell>

                    <TableCell>
                      {taller.instructor}
                    </TableCell>

                    <TableCell>
                      {taller.dia}
                    </TableCell>

                    <TableCell>
                      {taller.horaInicio} -{" "}
                      {taller.horaFin}
                    </TableCell>

                    <TableCell>
                      {taller.inscritos}/
                      {taller.capacidad}
                    </TableCell>

                    <TableCell>

                      <Chip
                        label={
                          completo
                            ? "Completo"
                            : `${disponibles} cupos`
                        }
                        color={
                          completo
                            ? "error"
                            : "success"
                        }
                      />

                    </TableCell>

                    <TableCell>

                      <Button
                        color="error"
                        variant="contained"
                        size="small"
                        onClick={() =>
                          eliminar(
                            taller.codigo
                          )
                        }
                      >
                        Eliminar
                      </Button>

                    </TableCell>

                  </TableRow>

                );

              })

            )}

          </TableBody>

        </Table>

      </TableContainer>

    </DashboardCard>

  );
}
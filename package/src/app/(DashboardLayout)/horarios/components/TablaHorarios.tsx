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
  Chip,
} from "@mui/material";

import { Horario } from "../models/horario";
import { obtenerHorarios } from "../services/horarioService";
import { obtenerSocios } from "../../socios/services/socioService";

export default function TablaHorarios() {

  const [horarios, setHorarios] = useState<Horario[]>([]);

  const cargarHorarios = () => {

    const horariosGuardados = obtenerHorarios();

    const socios = obtenerSocios();

    const horariosActualizados = horariosGuardados.map(
      (horario) => {

        const ocupados = socios.filter(
          (socio) =>
            socio.turno === horario.turno
        ).length;

        return {
          ...horario,
          ocupados,
        };

      }
    );

    setHorarios(horariosActualizados);

  };

  useEffect(() => {

    cargarHorarios();

  }, []);

  return (

    <DashboardCard title="Disponibilidad de Turnos">

      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                <strong>Turno</strong>
              </TableCell>

              <TableCell>
                <strong>Capacidad</strong>
              </TableCell>

              <TableCell>
                <strong>Ocupados</strong>
              </TableCell>

              <TableCell>
                <strong>Disponibles</strong>
              </TableCell>

              <TableCell>
                <strong>Estado</strong>
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {horarios.map((horario) => {

              const disponibles =
                horario.capacidad -
                horario.ocupados;

              const lleno =
                disponibles <= 0;

              return (

                <TableRow key={horario.codigo}>

                  <TableCell>
                    {horario.turno}
                  </TableCell>

                  <TableCell>
                    {horario.capacidad}
                  </TableCell>

                  <TableCell>
                    {horario.ocupados}
                  </TableCell>

                  <TableCell>
                    {disponibles}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={
                        lleno
                          ? "Completo"
                          : "Disponible"
                      }
                      color={
                        lleno
                          ? "error"
                          : "success"
                      }
                    />

                  </TableCell>

                </TableRow>

              );

            })}

          </TableBody>

        </Table>

      </TableContainer>

    </DashboardCard>

  );

}
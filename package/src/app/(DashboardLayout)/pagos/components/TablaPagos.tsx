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

import { Pago } from "../models/pago";
import {
  obtenerPagos,
  eliminarPago,
} from "../services/pagoService";

export default function TablaPagos() {

  const [pagos, setPagos] = useState<Pago[]>([]);

  const [buscar, setBuscar] = useState("");

  useEffect(() => {

    cargarPagos();

  }, []);

  const cargarPagos = () => {

    setPagos(obtenerPagos());

  };

  const eliminar = (codigo: string) => {

    const confirmar = confirm(
      "¿Desea eliminar este pago?"
    );

    if (!confirmar) return;

    eliminarPago(codigo);

    cargarPagos();

  };

  const pagosFiltrados = pagos.filter((pago) =>

    pago.codigo.toLowerCase().includes(buscar.toLowerCase()) ||

    pago.nombreSocio.toLowerCase().includes(buscar.toLowerCase()) ||

    pago.plan.toLowerCase().includes(buscar.toLowerCase())

  );

  return (

    <DashboardCard title="Historial de Pagos">

      <TextField
        label="Buscar Pago"
        placeholder="Código, socio o plan"
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

              <TableCell><strong>Socio</strong></TableCell>

              <TableCell><strong>Plan</strong></TableCell>

              <TableCell><strong>Monto</strong></TableCell>

              <TableCell><strong>Método</strong></TableCell>

              <TableCell><strong>Fecha</strong></TableCell>

              <TableCell><strong>Acciones</strong></TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {pagosFiltrados.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={7}
                  align="center"
                >
                  No existen pagos registrados.
                </TableCell>

              </TableRow>

            ) : (

              pagosFiltrados.map((pago) => (

                <TableRow key={pago.codigo}>

                  <TableCell>{pago.codigo}</TableCell>

                  <TableCell>{pago.nombreSocio}</TableCell>

                  <TableCell>{pago.plan}</TableCell>

                  <TableCell>S/ {pago.monto}</TableCell>

                  <TableCell>{pago.metodoPago}</TableCell>

                  <TableCell>{pago.fechaPago}</TableCell>

                  <TableCell>

                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => eliminar(pago.codigo)}
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
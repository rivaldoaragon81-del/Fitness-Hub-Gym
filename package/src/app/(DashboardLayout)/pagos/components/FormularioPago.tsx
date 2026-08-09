"use client";

import { useState, useEffect } from "react";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

import {

  Stack,

  TextField,

  Button,

  MenuItem,

} from "@mui/material";
import { Socio } from "../../socios/models/socio";
import { obtenerSocios } from "../../socios/services/socioService";
import { Pago } from "../models/pago";
import {
  obtenerPagos,
  guardarPagos,
  generarCodigoPago,
} from "../services/pagoService";

export default function FormularioPago() {

  const [socio, setSocio] = useState("");

  const [plan, setPlan] = useState("");

  const [monto, setMonto] = useState("");

  const [metodo, setMetodo] = useState("");
  const [fechaPago] = useState(
  new Date().toISOString().split("T")[0]
);

  const [socios, setSocios] = useState<Socio[]>([]);

  useEffect(() => {

  const listaSocios = obtenerSocios();

  setSocios(listaSocios);

}, []);

const registrarPago = () => {

  if (socio === "") {
    alert("Seleccione un socio.");
    return;
  }

  if (metodo === "") {
    alert("Seleccione un método de pago.");
    return;
  }

  const socioSeleccionado = socios.find(
    (s) => s.codigo === socio
  );

  if (!socioSeleccionado) {
    alert("No se encontró el socio.");
    return;
  }

  const pagos = obtenerPagos();

  const nuevoPago: Pago = {

    codigo: generarCodigoPago(pagos),

    codigoSocio: socioSeleccionado.codigo,

    nombreSocio:
      socioSeleccionado.nombres +
      " " +
      socioSeleccionado.apellidos,

    plan,

    monto: Number(monto),

    metodoPago: metodo,

    fechaPago,

  };

  pagos.push(nuevoPago);

  guardarPagos(pagos);

  alert("Pago registrado correctamente.");

  window.location.reload();

};
  return (

    <DashboardCard title="Registrar Pago">

      <Stack spacing={3}>

        <TextField

          select

          label="Socio"

          value={socio}

          onChange={(e) => {

  const codigo = e.target.value;

  setSocio(codigo);

  const socioSeleccionado = socios.find(
    (s) => s.codigo === codigo
  );

  if (!socioSeleccionado) {

    setPlan("");
    setMonto("");
    return;

  }

  setPlan(socioSeleccionado.plan);

  switch (socioSeleccionado.plan) {

    case "Básico":
      setMonto("80");
      break;

    case "Intermedio":
      setMonto("120");
      break;

    case "Premium":
      setMonto("180");
      break;

    default:
      setMonto("");

  }

}}

          fullWidth

        >

          <MenuItem value="">
  Seleccione un socio
</MenuItem>

{socios.map((socio) => (

  <MenuItem
    key={socio.codigo}
    value={socio.codigo}
  >

    {socio.codigo} - {socio.nombres} {socio.apellidos}

  </MenuItem>

))}

        </TextField>

        <TextField

          label="Plan"

          value={plan}

          fullWidth

          disabled

        />

        <TextField

          label="Monto"

          value={monto}

          fullWidth

          disabled

        />

        <TextField

          select

          label="Método de Pago"

          value={metodo}

          onChange={(e) => setMetodo(e.target.value)}

          fullWidth

        >

          <MenuItem value="Efectivo">

            Efectivo

          </MenuItem>

          <MenuItem value="Yape">

            Yape

          </MenuItem>

          <MenuItem value="Plin">

            Plin

          </MenuItem>

          <MenuItem value="Tarjeta">

            Tarjeta

          </MenuItem>

        </TextField>
             <TextField
        label="Fecha de Pago"
        value={fechaPago}
        fullWidth
        disabled
        />
        <Button

          variant="contained"
          onClick={registrarPago}

        >

          Registrar Pago

        </Button>

      </Stack>

    </DashboardCard>

  );

}
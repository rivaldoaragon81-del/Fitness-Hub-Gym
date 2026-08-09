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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { Taller } from "../models/taller";
import { Socio } from "../../socios/models/socio";

import {
  obtenerTalleres,
  eliminarTaller,
  inscribirSocioTaller,
  retirarSocioTaller,
} from "../services/tallerService";

import { obtenerSocios } from "../../socios/services/socioService";

export default function TablaTalleres() {

  const [talleres, setTalleres] = useState<Taller[]>([]);

  const [socios, setSocios] = useState<Socio[]>([]);

  const [socioSeleccionado, setSocioSeleccionado] =
    useState<Record<string, string>>({});

  const [tallerExpandido, setTallerExpandido] =
    useState<string | null>(null);


  // Cargar talleres y socios
  const cargarDatos = () => {

    setTalleres(obtenerTalleres());

    setSocios(obtenerSocios());

  };


  useEffect(() => {

    cargarDatos();

  }, []);


  // Eliminar taller
  const eliminar = (codigo: string) => {

    const confirmar = confirm(
      "¿Desea eliminar este taller?"
    );

    if (!confirmar) return;

    eliminarTaller(codigo);

    cargarDatos();

  };


  // Inscribir socio
  const inscribir = (codigoTaller: string) => {

    const codigoSocio =
      socioSeleccionado[codigoTaller];

    if (!codigoSocio) {

      alert(
        "Seleccione un socio para inscribir."
      );

      return;
    }

    const resultado =
      inscribirSocioTaller(
        codigoTaller,
        codigoSocio
      );

    if (resultado) {

      alert(
        "Socio inscrito correctamente en el taller."
      );

      setSocioSeleccionado({
        ...socioSeleccionado,
        [codigoTaller]: "",
      });

      cargarDatos();

    }

  };


  // Retirar socio del taller
  const retirar = (
    codigoTaller: string,
    codigoSocio: string
  ) => {

    const confirmar = confirm(
      "¿Desea retirar este socio del taller?"
    );

    if (!confirmar) return;

    const resultado =
      retirarSocioTaller(
        codigoTaller,
        codigoSocio
      );

    if (resultado) {

      alert(
        "Socio retirado correctamente del taller."
      );

      cargarDatos();

    }

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
                <strong>Inscribir socio</strong>
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
                  colSpan={9}
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


                // Buscar los socios inscritos
                const sociosDelTaller =
                  socios.filter((socio) =>
                    taller.sociosInscritos.includes(
                      socio.codigo
                    )
                  );


                return (

                  <>

                    {/* Fila principal del taller */}

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


                      {/* Seleccionar socio */}

                      <TableCell>

                        <FormControl
                          size="small"
                          sx={{
                            minWidth: 180,
                          }}
                        >

                          <InputLabel>
                            Socio
                          </InputLabel>

                          <Select

                            value={
                              socioSeleccionado[
                                taller.codigo
                              ] || ""
                            }

                            label="Socio"

                            disabled={completo}

                            onChange={(e) => {

                              setSocioSeleccionado({

                                ...socioSeleccionado,

                                [taller.codigo]:
                                  e.target.value,

                              });

                            }}

                          >

                            <MenuItem value="">
                              Seleccione socio
                            </MenuItem>


                            {socios.map((socio) => (

                              <MenuItem
                                key={socio.codigo}
                                value={socio.codigo}
                              >

                                {socio.nombres}{" "}
                                {socio.apellidos}

                              </MenuItem>

                            ))}

                          </Select>

                        </FormControl>


                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            mt: 1,
                          }}
                          disabled={completo}
                          onClick={() =>
                            inscribir(
                              taller.codigo
                            )
                          }
                        >
                          Inscribir
                        </Button>

                      </TableCell>


                      {/* Botones */}

                      <TableCell>

                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {

                            setTallerExpandido(

                              tallerExpandido ===
                              taller.codigo
                                ? null
                                : taller.codigo

                            );

                          }}
                        >

                          {tallerExpandido ===
                          taller.codigo

                            ? "Ocultar inscritos"

                            : "Ver inscritos"

                          }

                        </Button>


                        <Button
                          color="error"
                          variant="contained"
                          size="small"
                          sx={{
                            mt: 1,
                          }}
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


                    {/* Lista de socios inscritos */}

                    {tallerExpandido ===
                      taller.codigo && (

                      <TableRow>

                        <TableCell
                          colSpan={9}
                        >

                          <strong>
                            Socios inscritos en{" "}
                            {taller.nombre}
                          </strong>


                          {sociosDelTaller.length ===
                          0 ? (

                            <p>
                              No hay socios inscritos
                              en este taller.
                            </p>

                          ) : (

                            sociosDelTaller.map(
                              (socio) => (

                                <div
                                  key={socio.codigo}
                                  style={{
                                    display: "flex",
                                    justifyContent:
                                      "space-between",
                                    alignItems:
                                      "center",
                                    padding:
                                      "8px 0",
                                    borderBottom:
                                      "1px solid #eee",
                                  }}
                                >

                                  <span>

                                    {socio.codigo}
                                    {" - "}
                                    {socio.nombres}
                                    {" "}
                                    {socio.apellidos}

                                  </span>


                                  <Button
                                    color="error"
                                    size="small"
                                    variant="outlined"
                                    onClick={() =>
                                      retirar(
                                        taller.codigo,
                                        socio.codigo
                                      )
                                    }
                                  >
                                    Retirar
                                  </Button>

                                </div>

                              )
                            )

                          )}

                        </TableCell>

                      </TableRow>

                    )}

                  </>

                );

              })

            )}

          </TableBody>

        </Table>

      </TableContainer>

    </DashboardCard>

  );

}
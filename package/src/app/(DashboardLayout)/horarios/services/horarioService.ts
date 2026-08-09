import { Horario } from "../models/horario";

const KEY = "horarios";

export const CAPACIDAD_TURNO = 10;

const horariosIniciales: Horario[] = [
  {
    codigo: "HOR001",
    turno: "Mañana",
    capacidad: CAPACIDAD_TURNO,
    ocupados: 0,
  },
  {
    codigo: "HOR002",
    turno: "Tarde",
    capacidad: CAPACIDAD_TURNO,
    ocupados: 0,
  },
  {
    codigo: "HOR003",
    turno: "Noche",
    capacidad: CAPACIDAD_TURNO,
    ocupados: 0,
  },
];

export function obtenerHorarios(): Horario[] {

  const datos = localStorage.getItem(KEY);

  if (!datos) {

    localStorage.setItem(
      KEY,
      JSON.stringify(horariosIniciales)
    );

    return horariosIniciales;
  }

  const horarios: Horario[] = JSON.parse(datos);

  // Actualizar la capacidad máxima de cada turno
  const horariosActualizados = horarios.map(
    (horario) => ({
      ...horario,
      capacidad: CAPACIDAD_TURNO,
    })
  );

  localStorage.setItem(
    KEY,
    JSON.stringify(horariosActualizados)
  );

  return horariosActualizados;
}

export function guardarHorarios(
  horarios: Horario[]
) {

  localStorage.setItem(
    KEY,
    JSON.stringify(horarios)
  );

}
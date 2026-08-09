import { Asistencia } from "../models/asistencia";

const KEY = "asistencias";

export function obtenerAsistencias(): Asistencia[] {

  const datos = localStorage.getItem(KEY);

  if (!datos) return [];

  return JSON.parse(datos);

}

export function guardarAsistencias(asistencias: Asistencia[]) {

  localStorage.setItem(
    KEY,
    JSON.stringify(asistencias)
  );

}

export function generarCodigoAsistencia(
  asistencias: Asistencia[]
): string {

  if (asistencias.length === 0) {

    return "AST001";

  }

  const ultimo = asistencias[asistencias.length - 1].codigo;

  const numero = parseInt(
    ultimo.replace("AST", "")
  );

  return "AST" + String(numero + 1).padStart(3, "0");

}

export function eliminarAsistencia(codigo: string) {

  const asistencias = obtenerAsistencias();

  const nuevas = asistencias.filter(

    asistencia => asistencia.codigo !== codigo

  );

  guardarAsistencias(nuevas);

}
import { Socio } from "../models/socio";

const KEY = "socios";

// Capacidad máxima por turno
export const CAPACIDAD_TURNO = 10;

// Obtener todos los socios
export function obtenerSocios(): Socio[] {

  const datos = localStorage.getItem(KEY);

  if (!datos) return [];

  return JSON.parse(datos);

}

// Guardar todos los socios
export function guardarSocios(socios: Socio[]) {

  localStorage.setItem(
    KEY,
    JSON.stringify(socios)
  );

}

// Contar socios de un turno
export function contarSociosPorTurno(
  turno: "Mañana" | "Tarde" | "Noche"
): number {

  const socios = obtenerSocios();

  return socios.filter(
    socio => socio.turno === turno
  ).length;

}

// Verificar si un turno tiene cupo
export function tieneCupo(
  turno: "Mañana" | "Tarde" | "Noche"
): boolean {

  return contarSociosPorTurno(turno) < CAPACIDAD_TURNO;

}

// Generar código automático
export function generarCodigo(
  socios: Socio[]
): string {

  if (socios.length === 0) {
    return "SOC001";
  }

  const mayorCodigo = Math.max(
    ...socios.map((s) =>
      parseInt(
        s.codigo.replace("SOC", "")
      )
    )
  );

  return "SOC" +
    (mayorCodigo + 1)
      .toString()
      .padStart(3, "0");

}

// Eliminar un socio
export function eliminarSocio(
  codigo: string
) {

  const socios = obtenerSocios();

  const nuevosSocios = socios.filter(
    socio => socio.codigo !== codigo
  );

  guardarSocios(nuevosSocios);

}

// Actualizar un socio
export function actualizarSocio(
  socioActualizado: Socio
) {

  const socios = obtenerSocios();

  const nuevosSocios = socios.map(
    (socio) =>
      socio.codigo === socioActualizado.codigo
        ? socioActualizado
        : socio
  );

  guardarSocios(nuevosSocios);

}
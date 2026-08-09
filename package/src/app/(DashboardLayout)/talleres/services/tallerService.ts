import { Taller } from "../models/taller";

const KEY = "talleres";

export const CAPACIDAD_TALLER = 10;

export function obtenerTalleres(): Taller[] {

  const datos = localStorage.getItem(KEY);

  if (!datos) return [];

  return JSON.parse(datos);
}

export function guardarTalleres(
  talleres: Taller[]
) {

  localStorage.setItem(
    KEY,
    JSON.stringify(talleres)
  );

}

export function generarCodigoTaller(
  talleres: Taller[]
): string {

  if (talleres.length === 0) {
    return "TAL001";
  }

  const mayorCodigo = Math.max(
    ...talleres.map((taller) =>
      parseInt(
        taller.codigo.replace("TAL", "")
      )
    )
  );

  return (
    "TAL" +
    (mayorCodigo + 1)
      .toString()
      .padStart(3, "0")
  );

}

export function eliminarTaller(
  codigo: string
) {

  const talleres = obtenerTalleres();

  const nuevosTalleres = talleres.filter(
    (taller) =>
      taller.codigo !== codigo
  );

  guardarTalleres(nuevosTalleres);

}
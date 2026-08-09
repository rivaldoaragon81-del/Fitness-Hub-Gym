import { Taller } from "../models/taller";

const KEY = "talleres";

export const CAPACIDAD_TALLER = 10;

// Obtener talleres
export function obtenerTalleres(): Taller[] {

  const datos = localStorage.getItem(KEY);

  if (!datos) return [];

  const talleres: Taller[] = JSON.parse(datos);

  // Compatibilidad con talleres creados anteriormente
  return talleres.map((taller) => ({
    ...taller,
    sociosInscritos:
      taller.sociosInscritos || [],
    inscritos:
      taller.sociosInscritos
        ? taller.sociosInscritos.length
        : taller.inscritos || 0,
  }));
}


// Guardar talleres
export function guardarTalleres(
  talleres: Taller[]
) {

  localStorage.setItem(
    KEY,
    JSON.stringify(talleres)
  );

}


// Generar código automático
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


// Verificar si hay cupo
export function tieneCupoTaller(
  taller: Taller
): boolean {

  return taller.inscritos < taller.capacidad;

}


// Inscribir un socio
export function inscribirSocioTaller(
  codigoTaller: string,
  codigoSocio: string
): boolean {

  const talleres = obtenerTalleres();

  const taller = talleres.find(
    (t) => t.codigo === codigoTaller
  );

  if (!taller) {
    return false;
  }

  // Evitar inscripción duplicada
  if (
    taller.sociosInscritos.includes(
      codigoSocio
    )
  ) {

    alert(
      "El socio ya está inscrito en este taller."
    );

    return false;
  }

  // Verificar capacidad
  if (!tieneCupoTaller(taller)) {

    alert(
      `El taller ${taller.nombre} está completo.`
    );

    return false;
  }

  taller.sociosInscritos.push(
    codigoSocio
  );

  taller.inscritos =
    taller.sociosInscritos.length;

  guardarTalleres(talleres);

  return true;
}
// Retirar un socio de un taller
export function retirarSocioTaller(
  codigoTaller: string,
  codigoSocio: string
): boolean {

  const talleres = obtenerTalleres();

  const taller = talleres.find(
    (t) => t.codigo === codigoTaller
  );

  if (!taller) {
    return false;
  }

  const estabaInscrito =
    taller.sociosInscritos.includes(codigoSocio);

  if (!estabaInscrito) {
    return false;
  }

  taller.sociosInscritos =
    taller.sociosInscritos.filter(
      (codigo) => codigo !== codigoSocio
    );

  taller.inscritos =
    taller.sociosInscritos.length;

  guardarTalleres(talleres);

  return true;
}

// Eliminar un taller
export function eliminarTaller(
  codigo: string
) {

  const talleres = obtenerTalleres();

  const nuevosTalleres =
    talleres.filter(
      (taller) =>
        taller.codigo !== codigo
    );

  guardarTalleres(
    nuevosTalleres
  );

}
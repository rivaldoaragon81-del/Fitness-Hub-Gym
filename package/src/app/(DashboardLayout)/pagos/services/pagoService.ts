import { Pago } from "../models/pago";

const KEY = "pagos";

export function obtenerPagos(): Pago[] {

  const datos = localStorage.getItem(KEY);

  if (!datos) return [];

  return JSON.parse(datos);

}

export function guardarPagos(pagos: Pago[]) {

  localStorage.setItem(
    KEY,
    JSON.stringify(pagos)
  );

}

export function generarCodigoPago(pagos: Pago[]): string {

  if (pagos.length === 0) {
    return "PAG001";
  }

  const ultimo = pagos[pagos.length - 1].codigo;

  const numero = parseInt(
    ultimo.replace("PAG", "")
  );

  return "PAG" + String(numero + 1).padStart(3, "0");

}

export function eliminarPago(codigo: string) {

  const pagos = obtenerPagos();

  const nuevos = pagos.filter(
    pago => pago.codigo !== codigo
  );

  guardarPagos(nuevos);

}
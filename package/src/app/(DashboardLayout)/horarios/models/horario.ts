export interface Horario {
  codigo: string;
  turno: "Mañana" | "Tarde" | "Noche";
  capacidad: number;
  ocupados: number;
}
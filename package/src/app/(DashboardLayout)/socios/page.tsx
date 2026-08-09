"use client";

import { useEffect, useState } from "react";

import FormularioSocio from "./components/FormularioSocio";
import TablaSocios from "./components/TablaSocios";

import { Socio } from "./models/socio";
import { obtenerSocios } from "./services/socioService";

export default function SociosPage() {

  const [socios, setSocios] = useState<Socio[]>([]);

  const [socioSeleccionado, setSocioSeleccionado] =
    useState<Socio | null>(null);

  const cargarSocios = () => {

    setSocios(obtenerSocios());

  };

  useEffect(() => {

    cargarSocios();

  }, []);

  return (

    <div style={{ padding: "20px" }}>

      <FormularioSocio
        socioSeleccionado={socioSeleccionado}
        cargarSocios={cargarSocios}
        limpiarSeleccion={() => setSocioSeleccionado(null)}
      />

      <hr style={{ margin: "30px 0" }} />

      <TablaSocios
        socios={socios}
        cargarSocios={cargarSocios}
        seleccionarSocio={setSocioSeleccionado}
      />

    </div>

  );

}
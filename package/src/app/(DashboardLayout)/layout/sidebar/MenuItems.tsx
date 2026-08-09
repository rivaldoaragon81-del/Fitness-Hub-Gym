import {
  IconLayoutDashboard,
  IconUsers,
  IconCreditCard,
  IconClockHour4,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "FITNESS HUB GYM",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },

  {
    navlabel: true,
    subheader: "GESTIÓN",
  },

  {
    id: uniqueId(),
    title: "Socios",
    icon: IconUsers,
    href: "/socios",
  },

  {
    id: uniqueId(),
    title: "Pagos",
    icon: IconCreditCard,
    href: "/pagos",
  },

  {
    id: uniqueId(),
    title: "Asistencia",
    icon: IconClockHour4,
    href: "/asistencia",
  },
];

export default Menuitems;
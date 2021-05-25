
import Index from "views/Index.js";
import Settings from "views/examples/Settings.js";
import Comments from "views/examples/Comments.js";

import Appointments from "views/examples/Appointments.js";
import Videos from "views/examples/Videos.js";
import GiveAway from "./views/examples/GiveAway";

var routes = [

  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/appointments",
    name: "Appointments",
    icon: "ni ni-bullet-list-67 text-red",
    component: Appointments,
    layout: "/admin"
  },
  {
    path: "/videos",
    name: "Videos",
    icon: "ni ni-planet text-blue",
    component: Videos,
    layout: "/admin"
  },
  {
    path: "/comments",
    name: "Comments",
    icon: "ni ni-pin-3 text-orange",
    component: Comments,
    layout: "/admin"
  },
  {
    path: "/giveaway",
    name: "Giveaway",
    icon: "fas fa-gifts text-yellow",
    component: GiveAway,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "ni ni-single-02 text-green",
    component: Settings,
    layout: "/admin"
  },
];
export default routes;

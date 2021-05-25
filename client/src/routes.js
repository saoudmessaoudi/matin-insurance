
import Index from "views/Index.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Appointments from "views/examples/Appointments.js";
import Comments from "views/examples/Comments.js";
import Settings from "views/examples/Settings.js";
import Videos from "views/examples/Videos.js";
import AllVideos from "./views/examples/VideoList";
import VideoPage from "./views/examples/VideoPage";
import Forgot from "./views/examples/Forgot";
import BookAppointmentPage from "./views/examples/BookAppointmentPage";
import UserProfilePage from "./views/examples/UserProfilePage";
import NewPassword from "views/examples/NewPassword";
import NewYearGivePage from "views/examples/NewYearGivePage";
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
    path: "/settings",
    name: "Settings",
    icon: "ni ni-single-02 text-yellow",
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/comments",
    name: "Appointments",
    icon: "ni ni-bullet-list-67 text-red",
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
    path: "/videos",
    name: "Videos",
    icon: "ni ni-bullet-list-67 text-red",
    component: Videos,
    layout: "/admin"

  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/forgot/restore/:id",
    name: "New Password",
    icon: "",
    component: NewPassword,
    layout: "/auth"
  },
  {
    path: "/forgot",
    name: "Forgot",
    icon: "",
    component: Forgot,
    layout: "/auth"
  },
  {
    path: "/:id",
    name: "Video",
    icon: "ni ni-circle-08 text-pink",
    component: VideoPage,
    layout: "/video"
  },
  {
    path: "/",
    name: "Videos",
    icon: "ni ni-circle-08 text-pink",
    component: AllVideos,
    layout: "/video"
  },
  
  {
    path: "/",
    name: "BookAppointment",
    icon: "",
    component: BookAppointmentPage,
    layout: "/appointment"
  },
  {
    path: "/",
    name: "Profile",
    icon: "",
    component: UserProfilePage,
    layout: "/profile"
  },
  {
    path: "/",
    name: "Giveaway",
    icon: "",
    component: NewYearGivePage,
    layout: "/giveaway"
  }

];
export default routes;

import EmployeesPage from "views/Pages/adminPage/Employees ";
import EventsPage from "views/Pages/adminPage/Events";
import GridPlannerPage from "views/Pages/adminPage/GridPlanner";
import MenuPage from "views/Pages/adminPage/Menu.js";
import MyCustomersPage from "views/Pages/adminPage/MyCustomers.js";
import OptionsPage from "views/Pages/adminPage/Options.js";
import GridPage from "views/Pages/adminPage/Grid.js";
import ReviewsPage from "views/Pages/adminPage/Reviews";
import StaticsPage from "views/Pages/adminPage/Statistics ";
import PhotoElementsPage from "views/Pages/adminPage/PhotoElements";
import SupportPage from "views/Pages/adminPage/SupportPage.js";
import CalendarPage from "views/Pages/adminPage/Calendar.js";
import PricePlannerPage from "views/Pages/adminPage/PricePlanner.js";
import LoginPage from "views/Pages/LoginPage.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import WizardPage from "views/Pages/Wizard.js";
import BusinessPage from "views/Pages/BusinessProfile.js";
import PlanPage from "views/Pages/PlanPage.js";
import AdminWizard from "views/Pages/AdminWizard";
import ResetPage from "./views/Pages/PasswordResetPage-1";
import ConfirmPage from "./views/Pages/ConfirmPassword";
let routes = [
  {
    path: "login",
    name: "Login Page",
    component: LoginPage,
    layout: "/",
    show: false,
  },
  {
    path: "register",
    name: "Register Page",
    component: RegisterPage,
    layout: "/",
    show: false,
  },
  {
    path: "reset",
    name: "Reset Page",
    component: ResetPage,
    layout: "/",
    show: false,
  },
  {
    path: "confirm/:id",
    name: "Confirm Page",
    component: ConfirmPage,
    layout: "/",
    show: false,
  },
  // {
  //   path: "admin/wizard",
  //   name: "Wizard Page",
  //   component: WizardPage,
  //   layout: "/",
  //   show: false,
  // },
  {
    path: "wizard",
    name: "Wizard Page",
    component: WizardPage,
    layout: "/",
    show: false,
  },
  {
    path: "/wizard",
    name: "Wizard Page",
    component: AdminWizard,
    layout: "/admin",
    show: false,
  },
  {
    path: "/business/:id",
    name: "Business Page",
    component: BusinessPage,
    layout: "/admin",
    show: false,
  },
  {
    path: "/plan",
    name: "Plan",
    component: PlanPage,
    layout: "/admin",
    icon: "now-ui-icons design_app",
    show: true,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: CalendarPage,
    layout: "/admin",
    icon: "now-ui-icons design_app",
    show: false,
  },
  {
    path: "/dashboard",
    name: "Plan",
    component: GridPlannerPage,
    layout: "/admin",
    icon: "now-ui-icons design_app",
    show: false,
  },
  {
    path: "/gridPlan",
    name: "Grid planner",
    component: GridPlannerPage,
    layout: "/admin",
    icon: "now-ui-icons location_map-big",
    show: true,
  },
  {
    path: "/beachmap",
    name: "Grid",
    component: GridPage,
    layout: "/admin",
    icon: "now-ui-icons location_map-big",
    show: true,
  },
  {
    path: "/option",
    name: "Options",
    component: OptionsPage,
    layout: "/admin",
    icon: "now-ui-icons education_atom",
    show: true,
  },
  {
    path: "/price",
    name: "Price planner",
    component: PricePlannerPage,
    layout: "/admin",
    icon: "now-ui-icons business_money-coins",
    show: true,
  },
  {
    path: "/elements",
    name: "Photo elements",
    component: PhotoElementsPage,
    layout: "/admin",
    icon: "now-ui-icons business_money-coins",
    show: true,
  },
  {
    path: "/employee",
    name: "Employees",
    component: EmployeesPage,
    layout: "/admin",
    icon: "now-ui-icons business_badge",
    show: true,
  },
  // {
  //   path: "/menu",
  //   name: "Menu",
  //   component: MenuPage,
  //   layout: "/admin",
  //   icon: "now-ui-icons files_paper",
  //   show: true,
  // },
  // {
  //   path: "/support",
  //   name: "Support",
  //   component: SupportPage,
  //   layout: "/admin",
  //   icon: "now-ui-icons location_world",
  //   show: true,
  // },
  // {
  //   path: "/static",
  //   name: "Statics",
  //   component: StaticsPage,
  //   layout: "/admin",
  //   icon: "now-ui-icons business_chart-bar-32",
  //   show: true,
  // },
  // {
  //   path: "/customer",
  //   name: "My customers",
  //   component: MyCustomersPage,
  //   layout: "/admin",
  //   icon: "now-ui-icons ui-2_favourite-28",
  //   show: true,
  // },
  // {
  //   path: "/review",
  //   name: "Reviews",
  //   component: ReviewsPage,
  //   layout: "/admin",
  //   icon: "now-ui-icons ui-2_chat-round",
  //   show: true,
  // },
  // {
  //   path: "/events",
  //   name: "Events",
  //   component: EventsPage,
  //   layout: "/admin",
  //   icon: "now-ui-icons location_pin",
  //   show: true,
  // },
];

export default routes;

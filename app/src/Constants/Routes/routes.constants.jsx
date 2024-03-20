import { Redirect } from "react-router-dom";
import { getToken } from "../../Config/GeneralFunctions";
import { NotFound } from "../../Views/404";
import Dashboard from "../../Views/App/OldViews/Dashboard/Dashboard";
import NotificationsView from "../../Views/App/OldViews/Notification/NotificationsView";
import ForgotPassword from "../../Views/Auth/ForgotPassword/ForgotPassword";
import Login from "../../Views/Auth/Login/Login";
import ResetPassword from "../../Views/Auth/ResetPassword/ResetPassword";
import InMaintenance from "../../Views/InMaintenance";
import { HomePath, Paths } from "../paths.constants";
import { Views } from "../views.constants";
import Tournaments from "../../Views/App/Books/AllBooks/Books";

const getRoute = (path, component, exact = true) => ({
  path,
  component,
  exact,
});

export const AuthRoutes = [
  getRoute(Paths[Views.login].path, Login),
  getRoute(Paths[Views.signUp].path, Login),
  getRoute(Paths[Views.forgotPassword].path, ForgotPassword),
  getRoute(Paths[Views.resetPassword].path, ResetPassword),
];

export const AppRoutes = [
  //#region Dashboard
  getRoute(Paths[Views.home].path, Dashboard),
  //#endregion

  //#region Administration
  getRoute(Paths[Views.books].path, Tournaments),
  getRoute(Paths[Views.students].path, InMaintenance),
  getRoute(Paths[Views.courses].path, InMaintenance),
  getRoute(Paths[Views.subjects].path, InMaintenance),
  //#endregion

  //#region Profile
  getRoute(Paths[Views.profileView].path, InMaintenance),
  //#endProfile

  //#region Management
  getRoute(Paths[Views.users].path, InMaintenance),
  getRoute(Paths[Views.new_user].path, InMaintenance),
  getRoute(Paths[Views.edit_user].path, InMaintenance),

  //#region book
  getRoute(Paths[Views.new_book].path, InMaintenance),
  getRoute(Paths[Views.edit_book].path, InMaintenance),
];

export const OtherRoutes = [
  //Special Routes
  getRoute(Paths[Views.inMaintenance].path, InMaintenance),

  //Default route must be before from NotFound route
  getRoute(
    Paths[Views.default].path,
    () => {
      const token = getToken();
      if (token) return <Redirect to={HomePath.path} />;
      else return <Redirect to={Paths[Views.login].path} />;
    },
    true
  ),
  //NotFound Route must to be the last one
  getRoute(Paths[Views.notFound].path, NotFound, false),
];

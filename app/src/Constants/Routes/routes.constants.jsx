import { Redirect } from "react-router-dom";
import { getToken } from "../../Config/GeneralFunctions";
import { NotFound } from "../../Views/404";
import Dashboard from "../../Views/App/OldViews/Dashboard/Dashboard";
import ForgotPassword from "../../Views/Auth/ForgotPassword/ForgotPassword";
import Login from "../../Views/Auth/Login/Login";
import ResetPassword from "../../Views/Auth/ResetPassword/ResetPassword";
import InMaintenance from "../../Views/InMaintenance";
import { HomePath, Paths } from "../paths.constants";
import { Views } from "../views.constants";
import EditBook from "../../Views/App/Books/EditBook/EditBook";
import Books from "../../Views/App/Books/AllBooks/Books";
import Students from "../../Views/App/Students/AllStudents/Students";
import EditStudent from "../../Views/App/Students/EditStudent/EditStudent";
import NewBook from "../../Views/App/Books/NewBook/NewBook";
import Copies from "../../Views/App/Copy/AllCopies/copies";
import NewCopy from "../../Views/App/Copy/NewCopy/NewCopy";
import NewStudent from "../../Views/App/Students/NewStudent/NewStudent";
import Courses from "../../Views/App/Courses/AllCourses/Courses";
import EditCourse from "../../Views/App/Courses/EditCourse/EditCourse";
import NewCourse from "../../Views/App/Courses/NewCourse/NewCourse";
import Subjects from "../../Views/App/Subjects/AllSubjects/Subjects";
import EditSubject from "../../Views/App/Subjects/EditSubject/EditSubject";
import NewSubject from "../../Views/App/Subjects/NewSubject/NewSubject";
import ProfilePage from "../../Views/App/Profile/Profile";
import Account from "../../Views/App/Account/Account";
import Assign from "../../Views/App/Assign/assign";
import Unassign from "../../Views/App/Unassign/Unassign";

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

  //#region Dashboard
  getRoute(Paths[Views.assign_book].path, Assign),
  getRoute(Paths[Views.unassign_book].path, Unassign),
  //#endregion

  //#region Administration
  getRoute(Paths[Views.books].path, Books),
  getRoute(Paths[Views.students].path, Students),
  getRoute(Paths[Views.copies].path, Copies),
  getRoute(Paths[Views.courses].path, Courses),
  getRoute(Paths[Views.subjects].path, Subjects),
  //#endregion

  //#region Profile
  getRoute(Paths[Views.profileView].path, ProfilePage),
  getRoute(Paths[Views.accountView].path, Account),
  //#endProfile

  //#region user
  getRoute(Paths[Views.users].path, InMaintenance),
  getRoute(Paths[Views.new_user].path, InMaintenance),
  getRoute(Paths[Views.edit_user].path, InMaintenance),
  //#endregion

  //#region book
  getRoute(Paths[Views.new_book].path, NewBook),
  getRoute(Paths[Views.edit_book].path, EditBook),
  //#endregion

  //#region student
  getRoute(Paths[Views.new_student].path, NewStudent),
  getRoute(Paths[Views.edit_student].path, EditStudent),
  //#endregion

  //#region student
  getRoute(Paths[Views.new_copy].path, NewCopy),
  //#endregion

  //#region courses
  getRoute(Paths[Views.new_course].path, NewCourse),
  getRoute(Paths[Views.edit_course].path, EditCourse),
  //#endregion

  //#region courses
  getRoute(Paths[Views.new_subject].path, NewSubject),
  getRoute(Paths[Views.edit_subject].path, EditSubject),
  //#endregion
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

import { Views } from "./views.constants";

const getPath = (path, title = null, icon = null) => ({
  path,
  title,
  icon,
});

export const Paths = {
  //#region General
  [Views.default]: getPath(`/`),
  [Views.notFound]: getPath("*"),
  [Views.inMaintenance]: getPath("/in-maintenance"),
  //#endregion

  //#region Auth
  [Views.login]: getPath(`/login`),
  [Views.signUp]: getPath(`/sign-up`),
  [Views.forgotPassword]: getPath(`/forgot-password`),
  [Views.resetPassword]: getPath(`/reset-password/:recoverycode`),
  //#endregion

  //#region Dashboard
  [Views.home]: getPath("/home", "Home", "e88a"),
  //#endregion

  //#region Administration
  [Views.books]: getPath("/books/all", "Books", "ea19"),
  [Views.students]: getPath("/students/all", "Students", "f8d9"),
  [Views.courses]: getPath("/courses/all", "Courses", "e431"),
  [Views.subjects]: getPath("/subjects/all", "Subjects", "e0ee"),
  //#endadministration

  //#region profile
  [Views.profileView]: getPath("/profile"),
  //#profile


  //#region Management
  [Views.users]: getPath("/users", "Users", "f233"),
  [Views.new_user]: getPath("/users/new"),
  [Views.edit_user]: getPath("/users/edit/:user_guid"),
  //#Management

  
  //#region Old views
  [Views.dashboard]: getPath(`/dashboard`, "Dashboard", `e88a`),
  //#endregion
};

export const HomePath = Paths[Views.home];

export const replacePaths = (path, params, search = [], getObject = false) => {
  let newPath = path.path || path;
  let keys, key, value;
  params.map((obj) => {
    keys = Object.keys(obj);
    key = keys[0];
    value = obj[key];
    newPath = newPath.replace(`:${key}`, value);
  });

  if (search.length) newPath = `${newPath}?`;
  search.map((query) => {
    keys = Object.keys(query);
    key = keys[0];
    value = query[key];
    newPath = `${newPath}${key}=${value}&`;
  });

  if (getObject) {
    if (path.path) {
      path.path = newPath;
      return path;
    } else return newPath;
  }
  return newPath;
};

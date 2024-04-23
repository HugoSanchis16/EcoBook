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

  //#region Dashboard
  [Views.assign_book]: getPath("/assign", "Assign", "e7f0"),
  [Views.unassign_book]: getPath("/unassign", "Unassign", "e7ad"),
  //#endregion

  //#region Administration
  [Views.subjects]: getPath("/subjects/all", "Subjects", "e0ee"),
  [Views.courses]: getPath("/courses/all", "Courses", "e431"),
  [Views.books]: getPath("/books/all", "Books", "ea19"),
  [Views.students]: getPath("/students/all", "Students", "f8d9"),
  //#endadministration

  //#region profile
  [Views.profileView]: getPath("/profile"),
  [Views.accountView]: getPath("/account"),
  //#profile

  //#region Management
  [Views.users]: getPath("/users", "Users", "f233"),
  [Views.new_user]: getPath("/users/new"),
  [Views.edit_user]: getPath("/users/edit/:user_guid"),
  //#Management

  //#region books
  [Views.new_book]: getPath("/boook/new"),
  [Views.edit_book]: getPath("/boook/edit/:book_guid"),
  //#endregion

  //#region students
  [Views.new_student]: getPath("/student/new"),
  [Views.edit_student]: getPath("/student/edit/:student_guid"),
  //#endregion

  //#region copies
  [Views.copies]: getPath("/copies/:book_guid/all"),
  [Views.new_copy]: getPath("/copy/:book_guid/new"),
  [Views.print_barcodes]: getPath("/copies/print_barcodes/:book_guid"),
  //#endregion

  //#region Old views
  [Views.dashboard]: getPath(`/dashboard`, "Dashboard", `e88a`),
  //#endregion

  //#region courses
  [Views.new_course]: getPath("/course/new"),
  [Views.edit_course]: getPath("/course/edit/:course_guid"),
  //#endregion

  //#region subjects
  [Views.new_subject]: getPath("/subject/new"),
  [Views.edit_subject]: getPath("/subject/edit/:subject_guid"),
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

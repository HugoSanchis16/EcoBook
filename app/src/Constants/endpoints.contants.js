import { Configuration } from "../Config/app.config";

const BASE_URL = `${Configuration.API_URL}/endpoints`;

export const Endpoints = {
  Auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgotpassword",
    resetPassword: "/auth/resetpassword",
    checkUser: "/auth/checkUser",
  },
  Books: {
    allBooks: {
      getAll: "/books/getAll",
      edit: "/books/get",
    },
    editBook: {
      update: "/books/update",
    },
    deleteBook: {
      delete: "/books/delete",
    },
  },
  Students: {
    allStudents: {
      getAll: "/students/getAll",
      edit: "/students/get",
    },
    editStudent: {
      update: "/students/update",
    },
    deleteStudent: {
      delete: "/students/delete",
    },
  },
};

export const getEndpoint = (
  path,
  params = null,
  isCustom = false
) => {
  let url = `${BASE_URL}${path}.php`;
  if (isCustom) url = path;

  if (params) {
    params.map((param) => {
      url = `${url}/${param}`;
    });
  }

  return url;
};

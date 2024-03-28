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
    createBook: {
      create: "/books/create",
    }
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
    createStudent: {
      create: "/students/create",
    },
  },
  Subjects: {
    allSubjects: {
      getAllNames: "/subjects/getAllNames",
      edit: "/subjects/get",
    },
    editSubject: {
      update: "/subjects/update",
    },
    deleteSubject: {
      delete: "/subjects/delete",
    },
  },
  Copies: {
    allCopies: {
      getAll: "/copies/getAll",
    },
    editCopy: {
      updateState: "/copies/updateState",
      update: "/copies/update",
    },
    deleteCopy: {
      delete: "/copies/delete",
    },
    createCopy: {
      create: "/copies/create",
    }
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

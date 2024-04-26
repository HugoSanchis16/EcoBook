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
    },
  },
  Students: {
    allStudents: {
      getAll: "/students/getAll",
      edit: "/students/get",
      getHistory: "/students/getHistory",
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
      getAll: "/subjects/getAll",
      edit: "/subjects/get",
      getAllByCourse: "/subjects/getAllByCourse",
    },
    editSubject: {
      update: "/subjects/update",
    },
    deleteSubject: {
      delete: "/subjects/delete",
    },
    createSubject: {
      create: "/subjects/create",
    },
  },
  Courses: {
    allCourses: {
      getAllNames: "/courses/getAllNamesToAdd",
      getAllNamesToAssign: "/courses/getAllNamesToAssign",
      getAll: "/courses/getAll",
      edit: "/courses/get",
    },
    editCourse: {
      update: "/courses/update",
    },
    deleteCourse: {
      delete: "/courses/delete",
    },
    createCourse: {
      create: "/courses/create",
    },
  },
  Copies: {
    allCopies: {
      getAll: "/copies/getAll",
      getAllCodes: "/copies/getAllCodes",
    },
    editCopy: {
      updateState: "/copies/updateState",
    },
    infoCopy: {
      getInfo: "/copies/getInfo",
    },
    historyCopy: {
      getHistory: "/copies/gethistory",
    },
    deleteCopy: {
      delete: "/copies/delete",
    },
    createCopy: {
      create: "/copies/create",
    },
  },
  user: {
    profile: {
      get: "/user/getProfile",
    },
    account: {
      get: "/user/getAccount",
    },
    editUser: {
      update: "/user/update",
    },
    editEmail: {
      update: "/user/emailUpdate",
    },
    editPassword: {
      update: "/user/passwordUpdate",
    },
  },
  user: {
    profile: {
      get: "/user/getProfile",
    },
    account: {
      get: "/user/getAccount",
    },
    editUser: {
      update: "/user/update",
    },
    editEmail: {
      update: "/user/emailUpdate",
    },
    editPassword: {
      update: "/user/passwordUpdate",
    },
  },
  assign: {
    create: {
      assign: "/assign/assign",
    },
  },
  unassign: {
    search: {
      student: "/unassign/checkNia",
      copies: "/unassign/searchStudent",
    },
    unassign: {
      copies: "/unassign/unassign",
    },
  },
};

export const getEndpoint = (path, params = null, isCustom = false) => {
  let url = `${BASE_URL}${path}.php`;
  if (isCustom) url = path;

  if (params) {
    params.map((param) => {
      url = `${url}/${param}`;
    });
  }

  return url;
};

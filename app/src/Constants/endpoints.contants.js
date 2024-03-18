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
  Tournaments: {
    allTournaments: {
      getAll: "/tournaments/getAll",
    },
    newTournament: {
      getAvailableCategories: "/tournaments/getAvailableCategories",
      create: "/tournaments/create",
    },
  },
  Categories: {
    allCategories: {
      getAll: "/category/getAll",
    },
    newCategory: {
      create: "/category/create",
    },
    editCategory: {
      get: "/category/get",
      update: "/category/update",
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

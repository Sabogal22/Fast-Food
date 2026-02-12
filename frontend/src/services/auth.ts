import api from "./api";

export const loginRequest = async (username: string, password: string) => {
  const res = await api.post("/token/", {
    username,
    password,
  });

  return res.data;
};

export const getCurrentUser = async (token: string) => {
  const res = await api.get("/users/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

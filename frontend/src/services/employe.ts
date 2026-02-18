import api from "../services/api";

export const getEmployees = () => api.get("/users/employees/");
import api from "../services/api";

export const getEmployees = () => api.get("/users/employees/");
export const createEmployees = (data: any) => api.post("/users/employees/", data);
export const updateEmployees = (id: number, data: any) => api.put(`/users/employees/${id}/`, data);
export const deleteEmployees = (id: number) => api.delete(`/users/employees/${id}/`);
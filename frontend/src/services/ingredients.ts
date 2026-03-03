import api from "../services/api";

export const getIngredients = () => api.get("/ingredients/");
export const createIngredients = (data: any) => api.post("/ingredients/", data);
export const updateIngredients = (id: number, data: any) =>
  api.put(`/ingredients/${id}/`, data);
export const deleteIngredients = (id: number) =>
  api.delete(`/ingredients/${id}/`);
export const getUnits = async () => {
  return api.get("/ingredients/units/");
};

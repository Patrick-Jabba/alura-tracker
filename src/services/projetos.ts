import IProjeto from "@/interfaces/IProjeto";
import { AxiosInstance } from "axios";

export default (httpClient: AxiosInstance) => ({
  getProjetos: async () => {
    const response = await httpClient.get("projetos");

    return {
      data: response.data
    }
  },
  createProject: async (nome: string) => {
    const response = await httpClient.post("projetos", {
      nome,
    });

    return {
      data: response.data
    }
  },
  updateProject: async (projeto: IProjeto) => {
    const response = await httpClient.put(`projetos/${projeto.id}`, projeto);

    return {
      data: response.data
    }
  },
  deleteProject: async (id: string) => {
    await httpClient.delete(`projetos/${id}`)
  }
})
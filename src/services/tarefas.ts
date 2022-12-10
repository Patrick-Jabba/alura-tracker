import ITarefa from "@/interfaces/ITarefa";
import { AxiosInstance } from "axios";

export default (httpClient: AxiosInstance) => ({
  getTarefas: async () => {
    const response = await httpClient.get("tarefas");

    return {
      data: response.data
    }
  },
  createTarefa: async (tarefa: ITarefa) => {
    const response = await httpClient.post("tarefas", tarefa);

    return {
      data: response.data
    }
  },
  updateTarefa: async (tarefa: ITarefa) => {
    const response = await httpClient.put(`tarefas/${tarefa.id}`, tarefa);

    return { 
      data: response.data
    }
  }
})
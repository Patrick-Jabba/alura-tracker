import axios, {AxiosInstance} from "axios";
import ProjetoService from "./projetos";
import TarefaService from "./tarefas";

const httpClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/"
})

export default {
  projetos: ProjetoService(httpClient),
  tarefas: TarefaService(httpClient)
}
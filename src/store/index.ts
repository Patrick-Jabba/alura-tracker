import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUIR_TAREFA, NOTIFICAR, DEFINIR_PROJETO, DEFINIR_TAREFA } from "./tipo-mutacoes";
import { DELETE_PROJETO, GET_PROJETOS, GET_TAREFAS, POST_PROJETO, POST_TAREFA, UPDATE_PROJETO, UPDATE_TAREFA } from "./type-actions";

import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import INotification from "@/interfaces/INotification";

import services from "@/services";

interface State {
  projetos: IProjeto[],
  tarefas: ITarefa[],
  notifications: INotification[]

}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    projetos: [],
    tarefas: [],
    notifications: []
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        nome: nomeDoProjeto.toUpperCase(),
      } as IProjeto
      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex(proj => proj.id === projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter(proj => proj.id != id);
    },
    [DEFINIR_PROJETO](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(t => t.id === tarefa.id);
      state.tarefas[index] = tarefa;
    },
    [EXCLUIR_TAREFA](state, id: string) {
      state.tarefas = state.tarefas.filter(t => t.id != id);
    },
    [DEFINIR_TAREFA](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [NOTIFICAR](state, newNotification: INotification) {
      newNotification.id = new Date().getTime();
      state.notifications.push(newNotification);
      setTimeout(() => {
        state.notifications = state.notifications.filter(not => not.id !== newNotification.id);
      }, 3000)
    }
  },
  actions: {
    async [GET_PROJETOS]({ commit }) {
      try {
        const { data } = await services.projetos.getProjetos();

        commit(DEFINIR_PROJETO, data);
      } catch (error) {
        console.log(error)
      }
    },
    async [POST_PROJETO]({commit}, nomeDoProjeto:string) {
      try {
        const { data } = await services.projetos.createProject(nomeDoProjeto);
        
        commit(ADICIONA_PROJETO, data)
        return data;
      } catch (error) {
        console.log(error)
      }
    },
    async [UPDATE_PROJETO](context, projeto: IProjeto){
      try {
        const {data} = await services.projetos.updateProject(projeto);
        
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async [DELETE_PROJETO]({commit}, id: string){
      try {
        await services.projetos.deleteProject(id);
        commit(EXCLUIR_PROJETO, id);
      } catch (error) {
        console.log(error);
      }
    },
    async [GET_TAREFAS]({ commit }) {
      try {
        const { data } = await services.tarefas.getTarefas();

        commit(DEFINIR_TAREFA, data);
      } catch (error) {
        console.log(error)
      }
    },
    async [POST_TAREFA]({commit}, tarefa: ITarefa){
      try {
        const { data } = await services.tarefas.createTarefa(tarefa);

        commit(ADICIONA_TAREFA, data)
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async [UPDATE_TAREFA]({commit}, tarefa: ITarefa){
      try {
        const {data} = await services.tarefas.updateTarefa(tarefa);

        commit(ALTERA_TAREFA, data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  }
});

export default function useStore(): Store<State> {
  return vuexUseStore(key);
}


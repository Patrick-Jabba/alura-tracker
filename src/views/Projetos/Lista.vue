<template>
  <section>
    <RouterLink to="/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo Projeto</span>
    </RouterLink> 
    <table class="table is-fullwidth mt-5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="projeto in projetos" :key="projeto.id">
            <td>{{ projeto.id }}</td>
            <td> {{ projeto.nome }}</td>
            <td> 
              <RouterLink :to="`/${projeto.id}`" class="button" title="Editar Projeto">
                <span class="icon is-small">
                  <i class="fas fa-pencil-alt"></i>
                </span>
              </RouterLink>
              <button class="button ml-2 is-danger" @click="excluir(projeto.id)" title="Deletar Projeto">
                <span class="icon is-small">
                  <i class="fas fa-trash"></i>
                </span>
              </button>
            </td>
          </tr>
        </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import fns from "@/utils/dateFormat";

import useStore from "@/store"
import toast from "@/utils/toast";

import { DELETE_PROJETO, GET_PROJETOS } from "@/store/type-actions";
import { TipoNotification } from "@/interfaces/INotification";

export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch(GET_PROJETOS)
   
    const projetos = computed(() => { return store.state.projetos});

    async function excluir(id: string){
      store.dispatch(DELETE_PROJETO, id);
      toast.notificar(TipoNotification.SUCESSO, "Sucesso!", "Projeto excluído com êxito!");
    }

    return {
      projetos,
      excluir,
      fns
    };
  },
});
</script>
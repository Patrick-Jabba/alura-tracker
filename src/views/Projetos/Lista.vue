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
          <th>Data</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="projeto in projetos" :key="projeto.id">
            <td>{{ fns.formatDateAndTimeToString(projeto.id) }}</td>
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
import { EXCLUIR_PROJETO } from "@/store/tipo-mutacoes";
import { TipoNotification } from "@/interfaces/INotification";

export default defineComponent({
  setup() {
    const store = useStore();
   
    const projetos = computed(() => { return store.state.projetos});

    function excluir(id: string){
      store.commit(EXCLUIR_PROJETO, id);
      toast.notificar(TipoNotification.SUCESSO, "Sucesso!", "Projeto excluído com êxito!")
    }

    return {
      projetos,
      excluir,
      fns
    };
  },
});
</script>
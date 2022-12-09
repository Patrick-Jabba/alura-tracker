<template>
  <Box>
    <div class="columns">
      <div class="column is-4">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || "N/D" }}

      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
      <div>
        <button
          class="button ml-2"
          @click="editarTarefa(tarefa.id)"
          title="Editar Título"
        >
          <span class="icon is-small">
            <i class="fas fa-pencil"></i>
          </span>
        </button>
        <button
          class="button ml-2 is-danger"
          @click="excluirTarefa(tarefa.id)"
          title="Deletar Tarefa"
        >
          <span class="icon is-small">
            <i class="fas fa-trash"></i>
          </span>
        </button>
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

import Box from "./Box.vue";
import Cronometro from "./Cronometro.vue";

import ITarefa from "@/interfaces/ITarefa";

import useStore from "@/store/index";
import { EXCLUIR_TAREFA, NOTIFICAR } from "@/store/tipo-mutacoes";
import { TipoNotification } from "@/interfaces/INotification";

export default defineComponent({
  components: { Cronometro, Box },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },

  setup(){
    const store = useStore();

    const tarefas = computed(() => {
      return store.state.tarefas} )

    function excluirTarefa(id: string){
      store.commit(EXCLUIR_TAREFA, id);
      store.commit(NOTIFICAR, {
        titulo: "Exclusão de Tarefa",
        texto: "Tarefa excluída com sucesso!",
        tipo: TipoNotification.SUCESSO
      })
    }

    return {
      tarefas,
      excluirTarefa
    }
  }
});
</script>
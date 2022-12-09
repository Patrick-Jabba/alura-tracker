<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div v-if="tarefas.length > 0" class="lista">
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
    />
  </div>
  <div v-else class="lista">
    <Box>Você ainda não possui tarefas criadas :( </Box>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import useStore from "@/store";
import ITarefa from "@/interfaces/ITarefa";
import { ADICIONA_TAREFA } from "@/store/tipo-mutacoes";

import Box from "@/components/Box.vue";
import Tarefa from "@/components/Tarefa.vue";
import Formulario from "@/components/Formulario.vue";

export default defineComponent({
  components: {
    Box,
    Tarefa,
    Formulario,
  },
  setup() {
    const store = useStore();

    const tarefas = computed(() => {
      return store.state.tarefas;
    });

    function salvarTarefa(tarefa: ITarefa) {
      store.commit(ADICIONA_TAREFA, tarefa);
    }

    return {
      tarefas,
      salvarTarefa,
    };
  },
});
</script>

<style >
.lista {
  padding: 1.25rem;
}
</style>

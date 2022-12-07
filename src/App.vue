<template>
  <main
    class="columns is-gapless is-multiline"
    :class="state.modoEscuroAtivo? 'modo-escuro': ''"
      >
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div v-if="state.tarefas.length > 0" class="lista">
        <Tarefa
          v-for="(tarefa, index) in state.tarefas"
          :key="index"
          :tarefa="tarefa"
        />
      </div>
      <div v-else class="lista">
        <Box>Você não está muito produtivo hoje :( </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";

import Box from "@/components/Box.vue";
import Tarefa from "@/components/Tarefa.vue";
import BarraLateral from "@/components/BarraLateral.vue";
import Formulario from "@/components/Formulario.vue";

import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  components: {
    Box,
    Tarefa,
    BarraLateral,
    Formulario,
  },
  setup() {
    const state = reactive({
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false,
    });
    function salvarTarefa(tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    }

    function trocarTema(modoEscuroAtivo: boolean) {
      state.modoEscuroAtivo = modoEscuroAtivo;
    }

    return {
      state,
      salvarTarefa,
      trocarTema,
    };
  },
});
</script>

<style >
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #f8f8f2;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>

<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div v-if="tarefas.length > 0" class="lista">
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @editarTarefa="selecionarTarefa"
    />
  </div>
  <div v-else class="lista">
    <Box>Você ainda não possui tarefas criadas :( </Box>
  </div>
  <div class="modal" :class="{'is-active': state.tarefaSelecionada}" v-if="state.tarefaSelecionada">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Editar Tarefa</p>
      <button @click="fecharModal" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label for="descricaoDaTarefa" class="label"> Digite a descrição da tarefa </label>
        <input
          type="text"
          class="input"
          v-model="state.tarefaSelecionada.descricao"
          id="descricaoDaTarefa"
        />
      </div>
    </section>
    <footer class="modal-card-foot">
      <button @click="confirmarUpdateTarefa" class="button is-success">Salvar Alterações</button>
      <button @click="fecharModal" class="button">Cancelar</button>
    </footer>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue";

import useStore from "@/store";
import ITarefa from "@/interfaces/ITarefa";

import Box from "@/components/Box.vue";
import Tarefa from "@/components/Tarefa.vue";
import Formulario from "@/components/Formulario.vue";

import { GET_PROJETOS, GET_TAREFAS, POST_TAREFA, UPDATE_TAREFA } from "@/store/type-actions";

export default defineComponent({
  components: {
    Box,
    Tarefa,
    Formulario,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      tarefaSelecionada: null as ITarefa | null
    })
    store.dispatch(GET_TAREFAS);

    const tarefas = computed(() => {
      return store.state.tarefas;
    });

    function salvarTarefa(tarefa: ITarefa) {
      store.dispatch(GET_PROJETOS);
      store.dispatch(POST_TAREFA, tarefa);
    }

    function selecionarTarefa(tarefa: ITarefa){
      state.tarefaSelecionada = tarefa;
    }

    function fecharModal(){
      state.tarefaSelecionada = null;
      location.reload();
    }

    function confirmarUpdateTarefa(){
      store.dispatch(UPDATE_TAREFA, state.tarefaSelecionada);
      fecharModal();
    }

    return {
      state,
      tarefas,
      salvarTarefa,
      selecionarTarefa,
      fecharModal,
      confirmarUpdateTarefa
    };
  },
});
</script>

<style >
.lista {
  padding: 1.25rem;
}
</style>

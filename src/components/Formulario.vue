<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="state.descricaoTarefa"
        />
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive, defineComponent } from "vue";

import Temporizador from "@/components/Temporizador.vue";

export default defineComponent({
  components: {
    Temporizador
  },

  setup(_, {emit}){
    const state = reactive({
      descricaoTarefa: ""
    })

    function finalizarTarefa(tempoDecorrido: number) : void {
      emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: state.descricaoTarefa
      });
      state.descricaoTarefa = "";
    }

    return {
      state,
      finalizarTarefa
    }
  }
});
</script>

<style>
  .formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
  }
</style>
<template>
  <div class="box">
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
        />
      </div>
      <div class="column">
        <div class="is-flex is-align-items-center is-justify-content-space-between">
          <Cronometro :tempoEmSegundos="state.tempoEmSegundos" />
          <button class="button" @click="iniciarContagem">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>play</span>
          </button>
          <button class="button" @click="finalizarContagem">
            <span class="icon">
              <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";

import Cronometro from "@/components/Cronometro.vue";

export default defineComponent({
  components: {
    Cronometro
  },

  setup() {
    const state = reactive({
      tempoEmSegundos: 0,
      cronometro: 0
    });

    function iniciarContagem() {
      state.cronometro = setInterval(() => {
        state.tempoEmSegundos += 1
      }, 1000);
    }
    function finalizarContagem() {
      clearInterval(state.cronometro)
    }
    return {
      state,
      iniciarContagem,
      finalizarContagem,
    };
  },
});
</script>
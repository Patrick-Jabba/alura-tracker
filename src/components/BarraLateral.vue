<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="logo" />
    </h1>
    <button class="button" @click="alterarTema">
      {{ textoBotao }}
    </button>
  </header>
</template>

<script lang="ts">
import { reactive, defineComponent, computed } from "vue";

export default defineComponent({
    setup(_, {emit}){
      const state = reactive({
        modoEscuroAtivo: false
      });

      const textoBotao = computed(() => {
        if(state.modoEscuroAtivo){
          return "Ativar light mode 🌞"
        }
        return "Ativar dark mode 🌜"
      })

      function alterarTema(){
        state.modoEscuroAtivo = !state.modoEscuroAtivo;
        emit("aoTemaAlterado", state.modoEscuroAtivo)
      }
      return {
        state,
        textoBotao,
        alterarTema
      }
    }
});
</script>

<style>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
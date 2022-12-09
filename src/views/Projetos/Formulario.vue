<template>
  <section>
    <form @submit.prevent="salvarProjeto">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do projeto </label>
        <input
          type="text"
          class="input"
          v-model="state.nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button type="submit" class="button">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { reactive, defineComponent, onMounted } from "vue";
import router from "@/router";

import useStore from "@/store";
import toast from "@/utils/toast";
import { ADICIONA_PROJETO, ALTERA_PROJETO } from "@/store/tipo-mutacoes";
import { TipoNotification } from "@/interfaces/INotification";

export default defineComponent({
  props: {
    id: {
      type: String,
    },
  },

  setup(props) {
    const store = useStore();
    const state = reactive({
      nomeDoProjeto: "",
    });

    onMounted(() => {
      if (props.id) {
        const projeto = store.state.projetos.find((proj) => proj.id === props.id);
        state.nomeDoProjeto = projeto?.nome || "";
      }
    });

    function salvarProjeto() {
      if (props.id) {
        store.commit(ALTERA_PROJETO, {
          id: props.id,
          nome: state.nomeDoProjeto,
        });
      } else {
        if(!state.nomeDoProjeto){
          toast.notificar(TipoNotification.FALHA, "Oops!", "Seu projeto precisa de um nome.");
          return;
        }
        store.commit(ADICIONA_PROJETO, state.nomeDoProjeto);
      }
      state.nomeDoProjeto = "";
      toast.notificar(TipoNotification.SUCESSO, "Sucesso!", "Prontinho ;) Seu projeto foi criado.")
      router.push({ name: "projetos" });
    }

    return {
      state,
      salvarProjeto,
    };
  },
});
</script>

<style scoped>
  label {
    color: var(--texto-primario);
  }
</style>
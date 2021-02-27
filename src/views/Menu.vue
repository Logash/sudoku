<template>
  <v-card color="white"
          height="fit-content"
          class="d-flex flex-column pa-14">

    <v-btn x-large class="mb-5" @click="newGame">Новая игра</v-btn>

    <v-dialog
        transition="dialog-top-transition"
        v-model="dialog"
        max-width="300"
        persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn x-large class="mb-5"
          v-bind="attrs"
          v-on="on">
          Сложность
        </v-btn>
      </template>
      <DifficultSelect v-if="dialog"
        :initDifficalt="difficult"
        @save="changeDifficult($event)"
        @cancel="dialog = false">
      </DifficultSelect>
    </v-dialog>

    <v-btn x-large class="mb-5" @click="goToRecords">
      Таблица рекородов
    </v-btn>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DifficultSelect from '@/components/DifficultSelect.vue'
import gameStore from '@/store/modules/game'
import { Difficalt } from '@/models/Difficalt'

@Component({
  components: { DifficultSelect }
})
export default class Menu extends Vue {
  dialog = false

  get difficult (): Difficalt {
    return gameStore.difficult
  }

  changeDifficult (difficult: Difficalt) {
    gameStore.commitSetDifficult(difficult)
    this.dialog = false
  }

  newGame () {
    gameStore.dispatchStartNewGame()
    this.$router.push({ name: 'Game' })
  }

  goToRecords () {
    this.$router.push({ name: 'Records' })
  }
}
</script>

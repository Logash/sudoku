<template>
  <v-container class="game-control-panel d-flex flex-column" style="height: 100%">

    <v-card class="d-flex justify-center pa-5 font-weight-bold text-h6" outlined tile>
      {{ isGameOver ? 'Игра окончена' : time }}
    </v-card>

    <GameControlPanelNumpad
      v-if="!isGameOver"
      class="flex-grow-1"
      :disabled="!selectedCell"
      @enter-number="enterNumber">
    </GameControlPanelNumpad>

    <v-card v-else outlined tile class="flex-grow-1">
      <v-card-title class="text-h5">
        Результат
      </v-card-title>
      <v-card-text>
        <div>Сложность:</div>
        <div>Время:</div>
        <div>Ошибок:</div>
        <div>Место:</div>
      </v-card-text>
    </v-card>

    <v-btn v-if="!isGameOver"
      x-large class="mt-2"
      @click="finishGameAndCheckError"
      :disabled="!checkIsAvailbale">
      Проверить
    </v-btn>
    <v-btn v-else
      x-large class="mt-2"
      @click="newGame"
      :disabled="!isGameOver">
      Новая игра
    </v-btn>
    <v-btn x-large class="mt-2"
      @click="exit">
      Выход
    </v-btn>

  </v-container>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import GameControlPanelNumpad from '@/components/GameControlPanelNumpad.vue'
import gameStore from '@/store/modules/game'
import { SudokuCell } from '@/models/SudokuCell'
import { GameStateType } from '@/models/Enums'

@Component({
  components: { GameControlPanelNumpad }
})
export default class GameControlPanel extends Vue {
  @Prop() selectedCell: SudokuCell | null

  @Emit()
  enterNumber (value: number): number {
    return value
  }

  exit () {
    return true
  }

  newGame () {
    gameStore.dispatchStartNewGame()
  }

  get isGameOver (): boolean {
    return gameStore.gameState === GameStateType.End
  }

  get time (): string {
    const minutes = Math.floor(gameStore.time / 60)
    const seconds = gameStore.time % 60
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  get checkIsAvailbale (): boolean {
    return gameStore.isFilled && gameStore.gameState === GameStateType.Run
  }

  finishGameAndCheckError () {
    gameStore.dispatchFinishGameAndCheckError()
  }
}
</script>

<style lang="scss" scoped>
</style>

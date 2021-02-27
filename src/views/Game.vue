<template>
  <v-container class="d-flex" style="height: 100%">
      <GameField :field="field"
                  :selectedCell.sync="selectedCell">
      </GameField>
      <GameControlPanel
        style="max-width: 300px"
        :selectedCell="selectedCell"
        @enter-number="enterNumber">
      </GameControlPanel>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GameField from '../components/GameField.vue'
import GameControlPanel from '@/components/GameControlPanel.vue'
import gameStore from '@/store/modules/game'
import { SudokuCell } from '@/models/SudokuCell'

@Component({
  components: { GameField, GameControlPanel }
})
export default class Game extends Vue {
  get selectedCell (): SudokuCell | null {
    return gameStore.state.selectedCell
  }

  set selectedCell (value: SudokuCell | null) {
    gameStore.commitSetSelectedCell(value)
  }

  get field () {
    return gameStore.state.gameField.field
  }

  enterNumber (value: number) {
    gameStore.commitEnterSelectedCellValue(value)
  }
}
</script>

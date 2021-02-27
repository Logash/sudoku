<template>
  <v-container class="game-field d-flex flex-column" style="height: 100%">
    <div  class="game-field_row d-flex flex-grow-1"
          v-for="(row, i) in field"
          :key="`row_${i}`">
      <GameCell v-for="(cell, j) in row" :key="`col_${i}-${j}`"
              class="game-field_cell d-flex justify-center align-center flex-grow-1"
              :cell="cell"
              :isSelected="selectedCell === cell"
              @click.native="selectField(cell)">
      </GameCell>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import { SudokuCell } from '@/models/SudokuCell'
import GameCell from '@/components/GameCell.vue'

@Component({
  components: { GameCell }
})
export default class GameField extends Vue {
  @Prop() field: SudokuCell[][]
  @PropSync('selectedCell') currentCell: SudokuCell | null

  selectField (cell: SudokuCell) {
    this.currentCell = cell.isExcluded ? cell : null
  }
}
</script>

<style lang="scss" scoped>
.game-field {
  user-select: none;

  &_row:nth-child(3n) {
    .game-field_cell {
      border-bottom-color: black;
    }
  }

  &_row:nth-child(3n + 1) {
    .game-field_cell {
      border-top-color: black;
    }
  }

  &_cell:nth-child(3n) {
    border-right-color: black;
  }

  &_cell:nth-child(3n + 1) {
    border-left-color: black;
  }
}
</style>

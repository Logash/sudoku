<template>
  <v-card :class="classObject"
          outlined
          tile>
    {{cell.value}}
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SudokuCell } from '@/models/SudokuCell'

@Component
export default class GameField extends Vue {
  @Prop({ required: true }) cell: SudokuCell
  @Prop({ required: true }) isSelected: boolean

  get classObject () {
    return {
      'game-cell': true,
      'game-cell_excluded': this.cell.isExcluded,
      'game-cell_selected': this.isSelected,
      'game-cell_filled': this.cell.isExcluded && this.cell.value > 0,
      'game-cell_error': this.cell.hasError
    }
  }
}
</script>

<style lang="scss" scoped>
.game-cell {
  font-size: 20px;

  &_excluded {
    background-color: lightgray;
    color: rgba(0, 0, 0, 0);
    cursor: pointer;
  }

  &_filled {
    background-color: lightyellow;
    color: rgba(0, 0, 0, 1);
  }

  &_selected {
    background-color: lightgreen;
  }

  &_error {
    background-color: lightpink;
  }
}
</style>

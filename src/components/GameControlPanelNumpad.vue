<template>
    <div class="game-control-panel-numpad d-flex">
        <div v-for="(row, i) in field"
            :key="`row_${i}`"
            class="d-flex flex-column flex-grow-1 font-weight-bold">
        <v-card
            v-for="(value, j) in row"
            :key="`col_${i}-${j}`"
            class="game-control-panel-numpad__digit d-flex justify-center align-center flex-grow-1"
            outlined
            tile
            :disabled="disabled"
            @click="enterNumber(value)"
        >
            {{ value }}
        </v-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class GameControlPanelNumpad extends Vue {
  @Prop({ default: false }) disabled: boolean

  readonly field = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  @Emit()
  enterNumber (value: number) {
    return value
  }
}
</script>

<style lang="scss" scoped>
.game-control-panel-numpad {
  user-select: none;
}
</style>

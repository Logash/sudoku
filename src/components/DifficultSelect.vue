<template>
  <v-card>
    <v-card-title>Выберите сложность</v-card-title>

    <v-divider></v-divider>

    <v-card-text style="height: 200px;">
      <v-radio-group
        v-model="difficult"
        column
      >
        <v-radio
          v-for="item of difficultItems"
          :key="item.id"
          :label="item.name"
          :value="item"
        ></v-radio>
      </v-radio-group>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        color="blue darken-1"
        text
        @click="cancel"
      >
        ОТМЕНА
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        @click="save"
      >
        СОХРАНИТЬ
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { difficults } from '@/constants/difficalts'
import { Difficalt } from '@/models/Difficalt'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DifficultSelect extends Vue {
  @Prop() initDifficalt: Difficalt
  difficult: Difficalt

  created () {
    this.difficult = this.initDifficalt
  }

  get difficultItems () {
    return difficults
  }

  @Emit()
  save () {
    return this.difficult
  }

  @Emit()
  cancel () {
    return this.initDifficalt
  }
}
</script>

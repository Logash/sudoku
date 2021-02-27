<template>
  <v-card>
    <v-card-title>Таблица рекордов</v-card-title>
    <v-card-text>
      <v-row
          align="center"
          justify="center"
      >
        <v-btn-toggle mandatory v-model="difficult" class="flex-grow-1">
          <template v-for="d in difficults">
            <v-btn :key="d.id" :value="d" class="flex-grow-1">
                {{ d.name }}
            </v-btn>
          </template>
        </v-btn-toggle>
      </v-row>
    <v-data-table
        :headers="headers"
        :items="records"
    ></v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { difficults } from '@/constants/difficalts'
import { Difficalt } from '@/models/Difficalt'
import { GameResult } from '@/models/GameResult'
import recordsStore from '@/store/modules/records'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Records extends Vue {
  get difficults (): Difficalt[] {
    return difficults
  }

  get difficult (): Difficalt {
    return recordsStore.difficult
  }

  set difficult (difficalt: Difficalt) {
    recordsStore.commitSetDifficult(difficalt)
  }

  get headers () {
    return [
      {
        text: 'Игрок',
        value: 'user'
      },
      {
        text: 'Ошибок',
        value: 'errorCount'
      },
      {
        text: 'Время',
        value: 'time'
      }
    ]
  }

  get records (): GameResult[] {
    return recordsStore.records
  }
}
</script>

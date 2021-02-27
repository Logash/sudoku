/* eslint-disable @typescript-eslint/no-use-before-define */
import { RootState } from '@/store'
import { BareActionContext, getStoreBuilder } from 'vuex-typex'
import { GameResult } from '@/models/GameResult'
import gameData from '@/data/recordsData.json'
import { Difficalt } from '@/models/Difficalt'
import { difficults } from '@/constants/difficalts'

interface RecorsdsState {
  records: GameResult[];
  difficalt: Difficalt;
}

const initialRecordsState: RecorsdsState = {
  records: gameData,
  difficalt: difficults[0]
}

const module = getStoreBuilder<RootState>().module('records', initialRecordsState)

// getters
const getRecords = module.read(state => state.records.filter(r => r.difficultId === state.difficalt.id), 'getRecords')
const getDifficult = module.read(state => state.difficalt, 'getDifficult')

// mutations
function setDifficult (state: RecorsdsState, difficult: Difficalt) {
  state.difficalt = difficult
}

// actions

const recordsStore = {
  // getters
  get records (): GameResult[] {
    return getRecords()
  },
  get difficult (): Difficalt {
    return getDifficult()
  },

  // mutations
  commitSetDifficult: module.commit(setDifficult)

  // actions
}

export default recordsStore

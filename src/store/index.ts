import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { getStoreBuilder } from 'vuex-typex'
import { GameState } from './modules/game'
import { UserState } from './modules/user'

export interface RootState {
  user: UserState;
  game: GameState;
}

Vue.use(Vuex)
const store: Store<RootState> = getStoreBuilder<RootState>().vuexStore()
export default store

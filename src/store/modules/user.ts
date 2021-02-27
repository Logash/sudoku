/* eslint-disable @typescript-eslint/no-use-before-define */
import { RootState } from '@/store'
import { BareActionContext, getStoreBuilder } from 'vuex-typex'

export interface UserState {
  userName: string | null;
}

const initialUserState: UserState = {
  userName: null
}
const module = getStoreBuilder<RootState>().module('user', initialUserState)

// getters
const isAuthenticated = module.read(state => !!state.userName, 'isAuthenticated')
const getInitials = module.read(state => state.userName ? state.userName[0].toUpperCase() : '-', 'getInitials')
const getUserName = module.read(state => {
  if (state.userName) {
    return state.userName
  }
  throw new Error('User is not authenticated')
}, 'getUserName')

// mutations
function setUserName (state: UserState, userName: string | null) {
  state.userName = userName
}

// actions
function login (context: BareActionContext<UserState, RootState>, userName: string) {
  user.commitSetUserName(userName)
}

function logout (context: BareActionContext<UserState, RootState>) {
  user.commitSetUserName(null)
}

const user = {
  // getters
  get state (): UserState { return module.state()() },
  get isAuthenticated (): boolean { return isAuthenticated() },
  get getInitials (): string { return getInitials() },
  get userName (): string { return getUserName() },

  // mutations
  commitSetUserName: module.commit(setUserName),

  // actions
  dispatchLogin: module.dispatch(login),
  dispatchLogout: module.dispatch(logout)
}

export default user

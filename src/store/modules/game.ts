/* eslint-disable @typescript-eslint/no-use-before-define */
import { difficults } from '@/constants/difficalts'
import { Difficalt } from '@/models/Difficalt'
import { GameStateType } from '@/models/Enums'
import { GameResult } from '@/models/GameResult'
import { SudokuCell } from '@/models/SudokuCell'
import SudokuField from '@/models/SudokuField'
import { RootState } from '@/store'
import { BareActionContext, getStoreBuilder } from 'vuex-typex'
import user from './user'

export interface GameState {
  gameField: SudokuField;
  difficult: Difficalt;
  gameState: GameStateType;
  timer: {
    timerId: number;
    value: number;
  };
  selectedCell: SudokuCell | null;
  result: GameResult | null;
}

const initialGameState: GameState = {
  difficult: difficults[0],
  gameField: new SudokuField(),
  timer: {
    timerId: 0,
    value: 0
  },
  gameState: GameStateType.NotStarted,
  selectedCell: null,
  result: null
}

const module = getStoreBuilder<RootState>().module('game', initialGameState)

// getters
const getDifficult = module.read(state => state.difficult, 'getDifficult')
const getTime = module.read(state => state.timer.value, 'getTime')
const getIsFilled = module.read(state => state.gameField.isFilled, 'getIsFilled')
const getGameState = module.read(state => state.gameState, 'getGameState')
const getResult = module.read(state => state.gameState === GameStateType.End ? state.result : null, 'getResult')

// mutations
function newGame (state: GameState) {
  state.gameField.newGame()
}

function changeState (state: GameState, gameState: GameStateType) {
  state.gameState = gameState
}

function setDifficult (state: GameState, difficult: Difficalt) {
  state.difficult = difficult
}

function startTimer (state: GameState) {
  game.commitClearTimer()
  state.timer.timerId = setInterval(game.commitIncrementTimer, 1000)
}

function clearTimer (state: GameState) {
  game.commitStopTimer()
  state.timer.value = 0
}

function stopTimer (state: GameState) {
  window.clearInterval(state.timer.timerId)
  state.timer.timerId = 0
}

function incrementTimer (state: GameState) {
  state.timer.value++
}

function setSelectedCell (state: GameState, selectedCell: SudokuCell | null) {
  if (state.gameState === GameStateType.Run) {
    state.selectedCell = selectedCell
  }
}

function enterSelectedCellValue (state: GameState, value: number) {
  if (state.selectedCell) {
    state.selectedCell.value = value
  }
}

function clearGameState (state: GameState) {
  game.commitChangeState(GameStateType.NotStarted)
  game.commitClearTimer()
  state.result = null
  state.selectedCell = null
}

function setResult (state: GameState, errorCount: number) {
  state.result = {
    difficultId: state.difficult.id,
    errorCount: errorCount,
    time: state.timer.value,
    user: user.userName
  }
}

// actions
function startNewGame (context: BareActionContext<GameState, RootState>) {
  game.commitClearGameState()
  game.commitNewGame()
  game.commitChangeState(GameStateType.Run)
  game.commitStartTimer()
}

function finishGameAndCheckError (context: BareActionContext<GameState, RootState>) {
  if (game.isFilled) {
    game.commitStopTimer()
    game.commitChangeState(GameStateType.End)
    const errorCount = game.state.gameField.checkError()
    game.commitSetResult(errorCount)
    game.commitSetSelectedCell(null)
  }
}

const game = {
  // getters
  get state (): GameState { return module.state()() },
  get difficult (): Difficalt { return getDifficult() },
  get time (): number { return getTime() },
  get isFilled (): boolean { return getIsFilled() },
  get result (): GameResult | null { return getResult() },
  get gameState (): GameStateType { return getGameState() },

  // mutations
  commitSetDifficult: module.commit(setDifficult),
  commitNewGame: module.commit(newGame),
  commitChangeState: module.commit(changeState),
  commitStartTimer: module.commit(startTimer),
  commitClearTimer: module.commit(clearTimer),
  commitIncrementTimer: module.commit(incrementTimer),
  commitStopTimer: module.commit(stopTimer),
  commitSetSelectedCell: module.commit(setSelectedCell),
  commitEnterSelectedCellValue: module.commit(enterSelectedCellValue),
  commitClearGameState: module.commit(clearGameState),
  commitSetResult: module.commit(setResult),

  // actions
  dispatchStartNewGame: module.dispatch(startNewGame),
  dispatchFinishGameAndCheckError: module.dispatch(finishGameAndCheckError)
}

export default game

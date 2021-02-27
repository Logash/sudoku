import ImplSudokuFieldGenerator from './ImplSudokuFieldGenerator'
import SudokuFieldGenerator from './SudokuFieldGenerator'
import { SudokuCell } from './SudokuCell'

export default class SudokuField {
  private readonly _fieldGenerator: ImplSudokuFieldGenerator;
  private _gameField: SudokuCell[][] = [];

  constructor () {
    this._fieldGenerator = new SudokuFieldGenerator()
  }

  get field () {
    return this._gameField
  }

  public newGame () {
    const sourceField = this._fieldGenerator.generate()
    const exludedField = this._fieldGenerator.excludeCells(sourceField)
    this._gameField = exludedField.map((row, rowIndex) => {
      return row.map((value, colIndex) => {
        return {
          initValue: sourceField[rowIndex][colIndex],
          value: value,
          isExcluded: !value,
          hasError: false
        }
      })
    })
  }

  get isFilled (): boolean {
    for (let i = 0; i < this._gameField.length; i++) {
      for (let j = 0; j < this._gameField[i].length; j++) {
        if (!this._gameField[i][j].value) {
          return false
        }
      }
    }
    return true
  }

  public checkError (): number {
    let errorCount = 0
    this._gameField.forEach(row => {
      row.forEach(cell => {
        cell.hasError = cell.isExcluded && cell.initValue !== cell.value
        if (cell.hasError) {
          errorCount++
        }
      })
    })
    return errorCount
  }
}

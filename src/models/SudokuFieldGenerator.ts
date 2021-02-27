import ImplSudokuFieldGenerator from '@/models/ImplSudokuFieldGenerator'

export default class SudokuFieldGenerator implements ImplSudokuFieldGenerator {
  private readonly AREA_SIZE = 3;
  private readonly FILED_SIZE = 9;
  private readonly NUMBER_OF_MUTATIONS = 9;
  private _field: number[][] = [];

  public generate () {
    this.baseInit()
    const generateFunctions: { (): void } [] = [
      this.transposingField.bind(this),
      this.swapColumsWithinArea.bind(this),
      this.swapRowsWithinArea.bind(this)
    ]

    for (let i = 0; i < this.NUMBER_OF_MUTATIONS; i++) {
      const fnNumber = this.getRandomInt(generateFunctions.length)
      generateFunctions[fnNumber]()
    }

    return this._field
  }

  public excludeCells (field: number[][]): number[][] {
    const exludedField = field.map(row => {
      return row.map((value) => value)
    })

    let excludedCellCount = 0
    while (excludedCellCount < 2) {
      const row = this.getRandomInt(this.FILED_SIZE)
      const col = this.getRandomInt(this.FILED_SIZE)

      if (exludedField[row][col] !== 0) {
        exludedField[row][col] = 0
        excludedCellCount++
      }
    }

    return exludedField
  }

  private baseInit () {
    for (let i = 0; i < this.FILED_SIZE; i++) {
      this._field[i] = []
      for (let j = 0; j < this.FILED_SIZE; j++) {
        this._field[i][j] = ((i * this.AREA_SIZE + Math.floor(i / this.AREA_SIZE) + j) % this.FILED_SIZE + 1)
      }
    }
  }

  private transposingField () {
    this._field = this._field[0].map((col, i) => this._field.map(row => row[i]))
  }

  private swapRowsWithinArea () {
    const area = this.getRandomInt(this.AREA_SIZE)
    const line1 = this.getRandomInt(this.AREA_SIZE)
    const num1 = area * this.AREA_SIZE + line1

    let line2 = this.getRandomInt(this.AREA_SIZE)
    while (line1 === line2) {
      line2 = this.getRandomInt(this.AREA_SIZE)
    }
    const num2 = area * this.AREA_SIZE + line2

    const temp = this._field[num1]
    this._field[num1] = this._field[num2]
    this._field[num2] = temp
  }

  private swapColumsWithinArea () {
    this.transposingField()
    this.swapRowsWithinArea()
    this.transposingField()
  }

  private getRandomInt (max: number): number {
    return Math.floor(Math.random() * Math.floor(max))
  }
}

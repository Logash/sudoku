export default interface ImplSudokuFieldGenerator {
    generate: () => number[][],
    excludeCells: (field: number[][]) => number[][]
}
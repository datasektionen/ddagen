export function create2DArrayWithValues(cols: number, rows: number, values: string[]) {
    let array: any[][] = [];
    let index = 0; // To keep track of the current index in the 'values' array
    for (let i = 0; i < rows; i++) {
        array[i] = []; // Initialize a new row
        for (let j = 0; j < cols; j++) {
            array[i][j] = index < values.length ? values[index] : null;
            index++;
        }
    }
    return array;
  }
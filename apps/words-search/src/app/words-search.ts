export class LettersGrid {
  rows: string[][] = [];

  constructor(rawData: string) {
    this.rows = this.createTable(rawData);

    // this.columns = this.transformMatrix(this.rows);
  }

  rowsAsColumns(rows: string[][]): string[][] {
    const columnsArray = [];

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cellValue = row[columnIndex];
        let column = [];
        if (columnsArray.length <= columnIndex) {
          columnsArray.push(column);
        } else {
          column = columnsArray[columnIndex];
        }

        column.push(cellValue);
      }
    }

    return columnsArray;
  }

  initArray<T>(rows: string[][], defaultValue: T): T[][] {
    return rows.map((rowArray) =>
      Array.from({ length: rowArray.length }, (_v, _i) => defaultValue)
    );
  }

  toForwardDiagonalMatrix(
    rows: string[][],
    searchText: string,
    reverseText: string
  ): boolean[][] {
    const result: boolean[][] = this.initArray(rows, false);

    var Ylength = rows.length;
    var Xlength = rows[0].length;
    var maxLength = Math.max(Xlength, Ylength);
    var temp: string[];
    for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
      temp = [];
      for (var y = Ylength - 1; y >= 0; --y) {
        var x = k - y;
        if (x >= 0 && x < Xlength) {
          temp.push(rows[y][x]);
        }
      }
      if (temp.length > 0) {
        const str = temp.join('');

        const forwardIndex = str.indexOf(searchText);
        const indexOf =
          forwardIndex >= 0 ? forwardIndex : str.indexOf(reverseText);
        if (indexOf >= 0) {
          let index = 0;
          for (var y = Ylength - 1; y >= 0; --y) {
            var x = k - y;
            if (x >= 0 && x < Xlength) {
              if (index >= indexOf && index < indexOf + searchText.length) {
                result[y][x] = true;
              }
              index++;
            }
          }
          return result;
        }
      }
    }

    return undefined;
  }

  toBackwardDiagonalMatrix(
    rows: string[][],
    search: string,
    backwardSearch: string
  ): boolean[][] {
    const result: boolean[][] = this.initArray(rows, false);

    var Ylength = rows.length;
    var Xlength = rows[0].length;
    var maxLength = Math.max(Xlength, Ylength);
    var temp;
    for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
      temp = [];
      for (var y = Ylength - 1; y >= 0; --y) {
        var x = k - (Ylength - y);
        if (x >= 0 && x < Xlength) {
          temp.push(rows[y][x]);
        }
      }
      if (temp.length > 0) {
        const str = temp.join('');

        const forwardIndex = str.indexOf(search);
        const indexOf =
          forwardIndex >= 0 ? forwardIndex : str.indexOf(backwardSearch);
        if (indexOf >= 0) {
          let index = 0;
          for (var y = Ylength - 1; y >= 0; --y) {
            var x = k - (Ylength - y);
            if (x >= 0 && x < Xlength) {
              if (index >= indexOf && index < indexOf + search.length) {
                result[y][x] = true;
              }
              index++;
            }
          }
          return result;
        }
      }
    }

    return undefined;
  }

  createTable(data: string) {
    const rows = data.split('\n');
    const rowsArray = [];
    for (let r = 0; r < rows.length; r++) {
      let row = rows[r].replace(/[^0-9a-z]/gi, '');
      console.log(`${r}: ${row}`);
      const rowArray = [];
      for (const ch of row) {
        // console.log(ch);
        rowArray.push(ch);
      }
      rowsArray.push(rowArray);
    }
    return rowsArray;
  }

  insert(row: number, column: number, value: string) {
    const rowArray = this.rows[row];

    rowArray.splice(column, 0, value);
  }

  remove(row: number, column: number) {
    const rowArray = this.rows[row];

    rowArray.splice(column, 1);
  }

  search(searchText: string): boolean[][] {
    if (!searchText || searchText === '') {
      return [];
    }
    searchText = searchText.toLocaleUpperCase();
    const reverseText = this.reverseString(searchText);

    // search in rows (horizontal strings)
    const rows = this.rows;
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      const rowString = row.join('');

      const forwardIndex = rowString.indexOf(searchText);
      const indexOf =
        forwardIndex >= 0 ? forwardIndex : rowString.indexOf(reverseText);
      if (indexOf >= 0) {
        return this.calculateHorizontalIndexes(
          rowIndex,
          indexOf,
          searchText.length
        );
      }
    }

    // search in columns (vertical strings)
    const columns = this.rowsAsColumns(this.rows);
    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
      const column = columns[columnIndex];
      const columnString = column.join('');

      const forwardIndex = columnString.indexOf(searchText);
      const indexOf =
        forwardIndex >= 0 ? forwardIndex : columnString.indexOf(reverseText);
      if (indexOf >= 0) {
        return this.calculateVerticalIndexes(
          columnIndex,
          indexOf,
          searchText.length
        );
      }
    }

    const forwardDiagonalResult = this.toForwardDiagonalMatrix(
      rows,
      searchText,
      reverseText
    );
    if (!!forwardDiagonalResult) {
      return forwardDiagonalResult;
    }

    const backwardDiagonalResult = this.toBackwardDiagonalMatrix(
      rows,
      searchText,
      reverseText
    );
    if (!!backwardDiagonalResult) {
      return backwardDiagonalResult;
    }


  }

  calculateHorizontalIndexes(
    rowIndex: number,
    columnIndex: number,
    length: number
  ): boolean[][] {
    const matrix: boolean[][] = [];
    for (let row = 0; row < this.rows.length; row++) {
      const rowArray = this.rows[row];
      if (rowIndex === row) {
        matrix.push(
          Array.from({ length: rowArray.length }, (_v, i) => {
            return i >= columnIndex && i < columnIndex + length;
          })
        );
      } else {
        matrix.push(Array.from({ length: rowArray.length }, (_v, _i) => false));
      }
    }
    return matrix;
  }

  calculateVerticalIndexes(
    columnIndex: number,
    rowIndex: number,
    length: number
  ): boolean[][] {
    const matrix: boolean[][] = [];
    for (let row = 0; row < this.rows.length; row++) {
      const rowArray = this.rows[row];
      if (row >= rowIndex && row < rowIndex + length) {
        matrix.push(
          Array.from({ length: rowArray.length }, (_v, i) => {
            return i === columnIndex;
          })
        );
      } else {
        matrix.push(Array.from({ length: rowArray.length }, (_v, _i) => false));
      }
    }
    return matrix;
  }

  reverseString(str) {
    return str.split('').reverse().join('');
  }
}

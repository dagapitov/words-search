import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { LettersGrid } from '../words-search';

@Component({
  selector: 'letters-table',
  templateUrl: './letters-table.component.html',
  styleUrls: ['./letters-table.component.scss']
})
export class LettersTableComponent implements OnInit, OnChanges {
  @Input()
  lettersGrid: LettersGrid;

  @Input()
  highlights: boolean[][];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
  }

  remove(row: number, column: number) {
    this.lettersGrid.remove(row, column);
  }

  edit() {}

  insert(row: number, column: number) {
    this.lettersGrid.insert(row, column, '?');
  }

  isHighlighted(row: number, column: number) {
    if (!this.highlights || this.highlights.length < row) {
      return false;
    }

    if (!this.highlights[row] || this.highlights[row].length < column) {
      return false;
    }

    // console.log(row, column, this.highlights[row][column]);

    return this.highlights[row][column];
  }
}

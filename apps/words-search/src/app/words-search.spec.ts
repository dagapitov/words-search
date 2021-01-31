import { stringify } from '@angular/compiler/src/util';
import { LettersGrid } from './words-search';

describe('WordsSearch', () => {
  it('should create an instance', () => {
    expect(new LettersGrid('f')).toBeTruthy();
  });

  fit('should validate table data', () => {
    const data = `PZMET SAYLL
    IXFUHSEEDT
    UUAHDFSJIUU
    SGEQIXINCVZE
    FRLMUWZUTUV
    QHREWOLF OK
    TCcETWIAZOT
    DEHTIURFRG
    ZSCIWFREIWE
    SENZSKLJIBG`;

    const rows = data.split('\n');
    for (let r = 0; r < rows.length; r++) {
      let row = rows[r].replace(/[^0-9a-z]/gi, '');
      console.log(`${r}: ${row}`);
      for (let index = 0; index < row.length; index++) {
        const ch = row.charAt(index);

      }
    }
  });
});

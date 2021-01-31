import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CropperComponent } from 'angular-cropperjs';
import { createWorker } from 'tesseract.js';
import { LettersGrid } from './words-search';

@Component({
  selector: 'nx-words-search-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'words-search';

  files: File[] = [];

  config = {};
  imageUrl;
  status;
  highlightWord: boolean[][] | undefined;

  lettersGrid: LettersGrid;
  // lettersGrid: LettersGrid = new LettersGrid(`PZMETSAYLL
  // IXFUHSEEDT
  // UUAHDFSJUU
  // SGEQXNCVZE
  // FRLMUWZUTV
  // QHREWOLFOK
  // TCBTWJAZOT
  // DEHTIURFRG
  // ZSCSWFRXWE
  // SENZSKLJBG`);

  /**
   *
   */
  constructor(private sanitizer: DomSanitizer) {
  }

  //
  // Get with @ViewChild
  @ViewChild('angularCropper') public angularCropper: CropperComponent;

  onSelect(event) {
    console.log(event);
    if (event.addedFiles && event.addedFiles.length === 1) {
      const file: File = event.addedFiles[0];
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onPaste(event: any) {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    let blob = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
        break;
      }
    }
    if (!!blob) // this.files.push(blob); // insert to ngx-drop files array
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  }

  parseSelection() {
    const croppedImage = this.angularCropper.cropper.getCroppedCanvas().toDataURL();

    const worker = createWorker({
      logger: m => {
        this.status = m;
        return console.log(m);
      }
    });

    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      await worker.setParameters({
        tessjs_create_box: '1',
        tessjs_create_unlv: '1',
        tessjs_create_osd: '1',
      });
      const { data: { text, hocr, tsv, box, unlv } } = await worker.recognize(croppedImage);
      console.log(text);
      console.log(hocr);
      console.log(tsv);
      console.log(box);
      console.log(unlv);
      this.lettersGrid = new LettersGrid(text);
      await worker.terminate();
    })();
  }

  onWordChange(searchText) {
    this.highlightWord = this.lettersGrid.search(searchText);
    console.log(this.highlightWord);
  }
}

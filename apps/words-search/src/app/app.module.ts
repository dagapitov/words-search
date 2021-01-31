import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppComponent } from './app.component';
import { CustomDropzonePreviewComponent } from './custom-dropzone-preview/custom-dropzone-preview.component';
import { LettersTableComponent } from './letters-table/letters-table.component';
import { StatusComponent } from './status/status.component';
import { PercentPipe } from './percent.pipe';

@NgModule({
  declarations: [AppComponent, CustomDropzonePreviewComponent, LettersTableComponent, StatusComponent, PercentPipe],
  imports: [BrowserModule, NgxDropzoneModule, AngularCropperjsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

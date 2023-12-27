import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './ngMaterial/ngMaterial.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [CommonModule, AppMaterialModule],
  exports: [ToolbarComponent],
})
export class SharedModule {}

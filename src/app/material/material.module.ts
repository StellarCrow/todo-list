import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

const components = [MatCheckboxModule];

@NgModule({
  declarations: [],
  imports: [...components],
  exports: [...components],
})
export class MaterialModule {}

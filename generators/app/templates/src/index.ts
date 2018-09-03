import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaveraCoreModule, PrimaveraI18nModule, I18nConfig } from '@primavera/ngcore';

import { I18N_SOURCES } from './i18n/i18n.config';

// create the i18n config

let locale = JSON.parse(document.getElementById("appContextModel").innerHTML).user.culture;
let i18nConfig: I18nConfig = {
  locale: locale,
  sources: I18N_SOURCES
}

@NgModule({
  imports: [
    CommonModule,
    PrimaveraCoreModule.forRoot(),
    PrimaveraI18nModule.forRoot(i18nConfig)
  ],
  declarations: [
  ], entryComponents: [
  ],
  exports: [
  ]
})
export class <%= module %>Module {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: <%= module %>Module,
    };
  }
}

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaveraCoreModule, PrimaveraI18nModule, I18nConfig } from '@primavera/ngcore';

import { I18N_SOURCES } from 'i18n/i18n.config';
//ImportComponents

//ExportComponents

//ImportServices

// create the i18n config

let locale = JSON.parse(document.getElementById("appContextModel").innerHTML).user.culture;
let i18nConfig: I18nConfig = {
  locale: locale,
  sources: I18N_SOURCES
}


export const primaveraCoreModule: ModuleWithProviders = PrimaveraCoreModule.forRoot();
export const primaveraI18nModule: ModuleWithProviders = PrimaveraI18nModule.forRoot(i18nConfig);

@NgModule({
  imports: [
    CommonModule,
    primaveraCoreModule,
    primaveraI18nModule
    //NemComponents

  ],
  declarations: [
    //DeclarationsComponents

  ], entryComponents: [
      
  ],
  providers : [
    //ProvidersServices

  ],
  exports: [
    //ModuleExportComponents
  ]
})
export class <%= module %>Module {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: <%= module %>Module,
    };
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { NgxsModule } from '@ngxs/store';
import { SettingsState } from './shared/settings.state';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NgxsModule.forFeature([SettingsState]),
    FormsModule
  ]
})
export class SettingsModule { }

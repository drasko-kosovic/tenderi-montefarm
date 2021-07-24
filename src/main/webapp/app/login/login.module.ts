import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { LOGIN_ROUTE } from './login.route';
import { LoginComponent } from './login.component';
import { JhMaterialModule } from '../shared/jh-material.module';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([LOGIN_ROUTE]), JhMaterialModule],
  declarations: [LoginComponent],
})
export class LoginModule {}

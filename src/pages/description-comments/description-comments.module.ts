import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescriptionCommentsPage } from './description-comments';

@NgModule({
  declarations: [
    DescriptionCommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(DescriptionCommentsPage),
  ],
})
export class DescriptionCommentsPageModule {}

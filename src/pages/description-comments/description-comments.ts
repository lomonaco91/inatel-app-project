import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { c } from '@angular/core/src/render3';

@IonicPage()
@Component({
  selector: 'page-description-comments',
  templateUrl: 'description-comments.html',
})

export class DescriptionCommentsPage {

  listComments: any = [];
  idPost: number;
  listCM: any = [];
  titlePost: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    // Get data from params
    this.listComments = [];
    this.listComments = this.navParams.get('posts').comments;
    this.idPost = this.navParams.get('posts').idPost;
    this.titlePost = this.navParams.get('posts').name;

    console.log("NNNNNNNN -->", this.titlePost)

  }

  /**
   * Lifecycle with promisse to wait load comments
   */
  ionViewCanEnter() {
    return new Promise((resolve) => {
      this.loadComments(this.idPost);
      resolve();
    });
  }

  /**
   * Function to load comments
   * @param id -> Post Id
   */
  loadComments(id: number) {
    this.listComments.forEach(c => {
      if (c.postId === id) {
        console.log("NOME: ", c.name);
        console.log("EMAIL: ", c.email);
        console.log("CONT.", c.body);
        this.listCM.push(c);
      }
    });
  }

}

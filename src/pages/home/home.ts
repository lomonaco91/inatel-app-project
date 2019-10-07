import { urlApiAllPosts, urlApiAllComments } from './../../app/share/constant';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  // Control variables for favorite post 
  likePost: boolean = false;
  dislikePost: boolean = true;

  // List of posts/comments
  listPost: any = [];
  listComment: any = [];

  // Segment variables
  page: string = "";

  constructor(public navCtrl: NavController, private http: HttpClient) {
    this.listPost = [];
    this.listComment = [];
    this.page = "home";
  }

  ionViewCanEnter() {

    // Load the post list
    return new Promise((resolve, reject) => {
      this.http.get(urlApiAllPosts).subscribe(post => {
        this.listPost = post;
        console.log("POSTS -> ", this.listPost);
        resolve();

        // Load de comments list
        this.http.get(urlApiAllComments).subscribe(comment => {
          this.listComment = comment;
          console.log("COMMENTS -> ", this.listComment);
          resolve();
        }, err1 => {
          console.log("Application error 1 -> ", err1);
          reject();
        });

      }, err2 => {
        console.log("Application error 2 -> ", err2);
        reject();
      })
    });
  }

  segmentChanged(segment) {
    console.log("What page am i ?", segment);
  }


}

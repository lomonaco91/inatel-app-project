import { urlApiAllPosts, urlApiAllComments } from './../../app/share/constant';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { BasicCrudProvider } from '../../providers/basic-crud/basic-crud';

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
  listTotalComment: any = [];
  listFavorites: any = [];

  // Segment variables
  page: string = "";

  constructor(public navCtrl: NavController,
    private http: HttpClient,
    private dao: BasicCrudProvider) {

    this.listPost = [];
    this.listComment = [];
    this.listTotalComment = [];
    this.page = "home";
  }

  ionViewCanEnter() {
    // Load the post list
    return new Promise((resolve, reject) => {
      this.http.get(urlApiAllPosts).subscribe(post => {
        this.listPost = post;
        this.listPost.forEach(lp => {
          lp.favorite = false;
        });
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
    if (segment === "favoritos") {
      this.dao.getAllFavoritePost().then(res => {
        console.log("Result GET", res);
        this.listFavorites = res;
      }, err => {
        console.log("Error get", err);
      })
    }
  }

  favoriteCard(cardPost) {
    console.log("Favorite this post and save it in database", cardPost);

    // Variables do insert
    let postId = cardPost.id;
    let title = cardPost.title;
    let body = cardPost.body;


    // Check if is INSERT or UPDATE
    if (!cardPost.favorite) {
      console.log("INSERT");
      let favorite = 1;
      // this.dislikePost = false;
      // this.likePost = true;
      cardPost.favorite = true;
      this.dao.insertFavorite(postId, title, body, favorite);
    }
    else {
      console.log("UPDATE");
      let favorite = 0;
      // this.dislikePost = true;
      // this.likePost = false;
      cardPost.favorite = false;
      this.dao.updateFavorite(cardPost.id, favorite);
    }
  }


}

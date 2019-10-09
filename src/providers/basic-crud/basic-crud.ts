import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class BasicCrudProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  /**
   * This function insert a favorite post on DB
   */
  public insertFavorite(idPost, titulo, conteudo, favorite) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'INSERT INTO favoritos (idPost, titulo, conteudo, favorites) VALUES (?, ?, ?, ?)';
        let data = [idPost, titulo, conteudo, favorite];
        return db.executeSql(sql, data).then(() => {
          console.log("Success!");
        }, err => {
          console.log("Error insert data", err);
        })
      })
      .catch(e => console.error("Error INSERT: ", e));
  }

  /**
   * This function update a favorite post on DB
   */
  public updateFavorite(idPost, isFav) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'UPDATE favoritos SET favorites = ? WHERE idPost = ?';
        let data = [isFav, idPost];
        return db.executeSql(sql, data).then(() => {
          console.log("Success!");
        }, err => {
          console.log("Error update data", err);
        })
      })
      .catch(e => console.error("Error UPDATE: ", e));
  }

  /**
   * This function returns an array of posts
   */
  public getAllFavoritePost() {
    let isFavorite: number = 1
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM favoritos WHERE favorites = ?';
      let data = [isFavorite];
      return db.executeSql(sql, data).then((data: any) => {
        if (data.rows.length > 0) {
          let favs: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            var f = data.rows.item(i);
            favs.push(f)
          }
          console.log("Success!");
          return favs;
        }
        else {
          return [];
        }
      }, err => {
        console.log("Error get all data", err)
      })
    }).catch(e => {
      console.log("Error get all", e);
    });
  }

}

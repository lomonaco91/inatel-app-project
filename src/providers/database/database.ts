import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  /**
   * Return the DB instance - Open or create an SQLite DataBase
   */
  public getDB() {
    return this.sqlite.create({
      name: 'postdb',
      location: 'default'
    });
  }

  /**
   * Create tables in SQLite
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);
      })
      .catch(e => console.error(e));
  }

  /**
   * Function to create tables
   * @param db -> DB object to connect/create tables in DB
   */
  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS favoritos (favorites INTEGER NOT NULL, id INTEGER PRIMARY KEY NOT NULL, idPost INTEGER NOT NULL, titulo varchar(255) NOT NULL, conteudo varchar(255) NOT NULL)']
    ])
      .then(tb => console.log("Tables created"))
      .catch(err => console.error("Tables not created", err));
  }

}

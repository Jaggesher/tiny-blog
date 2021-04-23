import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
var sqlite3 = require('sqlite3').verbose();

let sqliteDB: any = null;
interface queryPramType {
  [key: string]: any;
}

@Injectable()
export class SqliteService implements OnModuleInit, OnModuleDestroy {
  constructor() {
    console.log('Constructor Called');
    sqliteDB = null;
  }
  /**
   * This will open DB connection.
   * Private Method
   * @param path
   * @returns success message of operation.
   */
  private open(path: string): Promise<String> {
    return new Promise(function (resolve, reject) {
      sqliteDB = new sqlite3.Database(path, function (err: Error) {
        if (err) reject('Open error: ' + err.message);
        else resolve(path + ' opened');
      });
    });
  }

  /**
   * For UPDATE, INSERT, DELETE query.
   * @param query
   * @returns true or error message.
   */
  run(query: string, params: queryPramType = {}): Promise<boolean> {
    //console.log(params);

    return new Promise(function (resolve, reject) {
      sqliteDB.run(query, params, function (err: Error) {
        if (err) reject(err.message);
        else resolve(true);
      });
    });
  }

  /**
   * For first row read.
   * @param query
   * @param params
   * @returns first row
   */
  get(query: string, params: queryPramType = {}): Promise<Object> {
    return new Promise(function (resolve, reject) {
      sqliteDB.get(query, params, function (err: Error, row: Object) {
        if (err) reject('Read error: ' + err.message);
        else {
          resolve(row);
        }
      });
    });
  }

  /**
   * For set of rows read.
   * @param query
   * @param params
   * @returns
   */
  all(query: string, params: queryPramType = {}) {
    return new Promise(function (resolve, reject) {
      sqliteDB.all(query, params, function (err: Error, rows: Array<object>) {
        if (err) reject('Read error: ' + err.message);
        else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * This will close db connection.
   * Private method.
   * @returns
   */
  private close(): Promise<boolean> {
    return new Promise(function (resolve, reject) {
      if (sqliteDB) sqliteDB.close();
      resolve(true);
    });
  }

  async onModuleInit() {
    console.log('On module init called');
    try {
      console.log(await this.open('src/tiny-blog.db'));
    } catch (Error) {
      console.log(Error.message);
    }
  }

  async onModuleDestroy() {
    console.log('On module destroy called');
    try {
      this.close();
    } catch (Error) {
      console.log(Error.message);
    }
  }
}

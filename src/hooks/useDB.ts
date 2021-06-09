export interface DBoptions {
  version: number | string /* 版本信息 */;
  name: string /* 数据库name */;
}
function isFloat(number: string): boolean {
  return /^\d+(\.\d+)?$/.test(number);
}
class Use_DB {
  protected db: IDBOpenDBRequest | null;
  protected options: DBoptions;
  protected indexedDB:unknown;
  protected IDBTransaction:unknown;
  protected IDBKeyRange:unknown;
  constructor(options: DBoptions) {
    this.options = options;
    this.db = null;
    this.init();
  }
  init() {
    this.hasDB()
    if(!this.indexedDB) throw new Error("不支持数据库访问，请更换浏览器")
    if (isFloat(this.options.version.toString()))
      console.log(
        "[indexedDB]waring:浮点数作为版本号，，这可能导致 upgradeneeded 事件不会被触发"
      );
      console.log("正在链接数据库，请稍后");
      
    this.db = indexedDB.open(this.options.name, Number(this.options.version));
    this.db.onerror = this.requestError;
    this.db.onsuccess = this.requestSuccess;
  }
  requestError(error): never {
    throw new Error(error);
  }
  requestSuccess(event: Event): void {
    console.log("数据库链接成功...");
  }
  hasDB() {
    // In the following line, you should include the prefixes of implementations you want to test.
    this.indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    // DON'T use "var indexedDB = ..." if you're not in a function.
    // Moreover, you may need references to some window.IDB* objects:
    this.IDBTransaction =
      window.IDBTransaction ||
      window.webkitIDBTransaction ||
      window.msIDBTransaction;
    this.IDBKeyRange =
      window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
  }
}
export default Use_DB;

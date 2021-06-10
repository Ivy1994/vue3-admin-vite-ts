import localforage from "localforage";
import { isArray } from "src/directive/modules/button";
export function isFloat(number: any): boolean {
  if (number === undefined || number === null) return true;
  return /^\d+(\.\d+)?$/.test(number);
}
export type updateType = "r" | "i" | "u";
export interface DBoptions extends Omit<LocalForageOptions, "storeName"> {
  storeName: string | Array<string>;
}
export type storeType = string;
class Use_DB {
  protected DBMAp: Map<storeType, LocalForage> = new Map();
  protected options: DBoptions;
  constructor(options: DBoptions) {
    this.options = options;
    this.init();
  }
  protected init() {
    if (!this.hasDB()) throw new Error("不支持数据库访问，请更换浏览器");
    
    if (isFloat(this.options?.version))
      console.log(
        "[indexedDB]waring:浮点数作为版本号，这可能导致 upgradeneeded 事件不会被触发"
      );
    const { storeName,name,version } = this.options;
    if(storeName) {
      this.addSource(storeName);
    }
  }
  updateItem (currentSource: string, key: string,data:any,type?:updateType,){
    const currentSor = this.DBMAp.get(currentSource);
    if(!currentSor) {
      this.addSource(currentSource)
    }
    //@ts-ignore
    this.updateArrayData(currentSor,data,key)
  }
  getItem(currentSource: string, key: string): Promise<any> {
    if (!key || !currentSource)
      Promise.reject(new Error("未选择数据仓库或未输入查询key值"));
    const currentSor = this.DBMAp.get(currentSource);
    return new Promise(async (reslove, reject) => {
      try {
        reslove(currentSor?.getItem(key));
      } catch (e) {
        reject(e);
      }
    });
  }
  setItem(currentSource: string, key: string, value: any): Promise<any> {
    if (!currentSource || !key)
      Promise.reject(new Error("未选择数据仓库或未输入key值"));
    const currentSor = this.DBMAp.get(currentSource);
    const isExist =  this.beforeSet(currentSource, key)
    if(!isExist) return Promise.reject(new Error("不存在的项目"))
    return new Promise(async (reslove, reject) => {
      try {
        await currentSor?.setItem(key, value);
        reslove(value);
      } catch (e) {
        reject(e);
      }
    });
  }
  removeItem(currentSource: string, key: string): Promise<any> {
    if (!key || !currentSource)
      Promise.reject(new Error("未选择数据仓库或未输入key值"));
    return new Promise((reslove, reject) => {
      try {
        this.DBMAp.get(currentSource)
          ?.removeItem(key, () => {
            reslove("success");
          })
          .catch(e => {
            throw new Error(e);
          });
      } catch (e) {
        reject(e);
      }
    });
  }
  async removeTable(currentSource: string): Promise<any> {
    if (!currentSource) Promise.reject(new Error("未选择数据仓库"));
    await this.DBMAp.get(currentSource)?.clear();
    return Promise.resolve();
  }
  async updateArrayData(
    curDB: string,
    list: Array<any>,
    key: string,
    type?: updateType
  ) {
    try {
      const isTable = this.hasTable(curDB)
      if(!isTable) throw new Error("没有对应表，请先添加对应表");
      const DB = await this.DBMAp.get(curDB)
      const value = await DB?.getItem(key);
      if (value && isArray(value)) {
        switch (type) {
          case "i":
            (value as Array<any>).push([...list]);
            await DB?.setItem(key, value);
            break;
          case "r":
            await DB?.setItem(key, list);
            break;
          case "u":
            (value as Array<any>).unshift(list);
            break;
          default:
            (value as Array<any>).push([...list]);
            await DB?.setItem(key, value);
            break;
        }
      } else {
        await DB?.setItem(key, list);
      }
    } catch (e) {
      throw new Error(e);
    }
  }
  clearOrgin(): void {
    this.DBMAp.forEach(v => {
      v.clear();
    });
  }
  addSource(sourceName: string | Array<string>) {
    const { name, version } = this.options;
    if (Array.isArray(sourceName)) {
      sourceName.forEach(v => {
        const db = localforage.createInstance({
          name,
          version,
          storeName: v,
        });
        this.DBMAp.set(v, db);
      });
    } else {
      const db = localforage.createInstance({
        name,
        version,
        storeName: sourceName,
      });
      this.DBMAp.set(sourceName, db);
    }
  }
  protected hasDB() {
    return (
      localforage.supports(localforage.INDEXEDDB) ||
      localforage.supports(localforage.WEBSQL) ||
      localforage.supports(localforage.LOCALSTORAGE)
    );
  }
  beforeSet(currentSource: string, key: string){
    const hasTable = this.hasTable(currentSource)
    if(!hasTable) return false;
    return true
  }
  hasTable(key):boolean{
    let index = false;
    this.DBMAp.forEach((v,i)=>{
      if(i === key) {
        index = true
      }
    })
    return index
  }
  async hasColumns (db,key) {
    let kyes = await db.keys();
    if(!kyes) return false;
    if(!kyes.length) return false;
    return kyes.some(v =>v=== key)
  }
  get source() {
    const res = {};
    this.DBMAp.forEach(async (i, v) => {
      let kyes = await i.keys();
      if (kyes.length) {
        const item = {};
        kyes.forEach(async (value, index) => {
          const itemValue = await this.getItem(v, value);
          Object.assign(item, { [value]: itemValue });
        });
        Object.assign(res, { [v]: item });
      } else {
        Object.assign(res, { [v]: "" });
      }
    });
    return res;
  }
}
export default Use_DB;

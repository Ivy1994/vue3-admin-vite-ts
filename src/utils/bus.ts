/* 事件类型定义 */
export type EventHandler = (...args: any[]) => any;

export default class EventBus {
  /* 订阅的事件，存储到Map中 */
  public subscribers: Map<string, Set<EventHandler>> = new Map();

  public on(name: string, handler: EventHandler): void {
    /**
     * 订阅处理
     * @param {Boolean}  this.subscribers.has(name) 判断是否存在key，不存在则在Map中插入该key，并添加事件
     * 已存在则给该key增加新的hander，一个key，会触发多个事件
     * @param {EventHandler} handler 应该为具名函数，最好不要使用箭头函数或者匿名函数
     * @param {string} name 订阅key 
     */
    if (!this.subscribers.has(name)) {
      this.subscribers.set(name, new Set());
    }
    this.subscribers.get(name)?.add(handler);
  }

  public off(name: string, handler: EventHandler): boolean {
    /**
     * 解除单个事件的订阅
     * @return {Boolean} 是否成功解除该事件
     */
    return this.subscribers.get(name)?.delete(handler) ?? false;
  }

  public offAll(name: string): void {
    /**
     * 解除指定key下所有事件的订阅
     */
    this.subscribers.get(name)?.clear();
  }
  public destroy(): void {
    /**
     * 清空订阅Map
     */
    this.subscribers.clear();
  }
  public emit(name: string, ...args: any[]): void {
    /* 触发该key下所有事件 */
    this.subscribers.get(name)?.forEach((handler) => handler(...args));
  }
  public gather<T>(name: string, ...args: any[]): T[] {
    /* 执行该key下所有事件，并返回事件执行后的结果 */
    const results: T[] = [];
    this.subscribers.get(name)?.forEach((handler) => {
      results.push(handler(...args));
    })
    return results;
  }

  public gatherMap<T>(name: string, ...args: any[]): Map<EventHandler, T> {
        /* 执行该key下所有事件，并返回事件执行后的结果，Map<key,value>形式 */

    const results = new Map<EventHandler, T>();
    this.subscribers.get(name)?.forEach((handler) => {
      results.set(handler, handler(...args));
    })
    return results;
  }

  public once(name: string, handler: EventHandler): void {
    /* 单次监听，先销毁，再执行 */
    const onceHandler = (...args: any[]) => {
      this.off(name, onceHandler);
      return handler(...args);
    };
    this.on(name, onceHandler);
  }

  public promise(name: string): Promise<any> {
    /* 异步方式执行，仅执行一次 */
    return new Promise((resolve) => {
      this.once(name, resolve);
    });
  }

  get subscribe(): (name: string, handler: EventHandler) => void {
    return this.on;
  }

  get unsubscribe(): (name: string, handler: EventHandler) => boolean {
    return this.off;
  }

  get publish(): (name: string, ...args: any[]) => void {
    return this.emit;
  }
}

export const eventBus = new EventBus();
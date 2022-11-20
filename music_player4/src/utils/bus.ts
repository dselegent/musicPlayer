import * as Console from 'console';

type BusClass = {
  emit: (name: string) => void;
  on: (name: string, callback: Function) => void;
};

type CallbackName = string | number | symbol;

type List = {
  [key: CallbackName]: Array<Function>;
};

class Bus implements BusClass {
  list: List;

  constructor() {
    this.list = {};
  }

  emit(name: string, ...args: Array<any>) {
    let callbacks: Array<Function> | undefined = this.list[name];
    if (callbacks === undefined) {
      console.warn(`event "${name}" is not bound`);
      return;
    }
    callbacks.forEach(callback => {
      callback.apply(this, args); // this 为 Bus.ts 导出的实例, on方法如果使用ArrowFunction, 则无法使用this
    });
  }

  on(name: string, callback: Function) {
    let callbacks: Array<Function> = this.list[name] || [];
    callbacks.push(callback);
    this.list[name] = callbacks;
  }
}
export const bus = new Bus();

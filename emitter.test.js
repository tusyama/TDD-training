import { test, describe, beforeEach, expect, mock } from "bun:test";

// EventEmitter
//  ├ on(event, handler)
//  ├ off(event, handler)
//  ├ once(event, handler)
//  ├ emit(event, ...args)

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, handler) {
    const handlers = this.events.get(event);
    if (handlers) {
      this.events.set(event, [...handlers, handler]);
      return;
    }
    this.events.set(event, [handler]);
  }

  off(event, handler) {
    const handlers = this.events.get(event);
    if (handlers) {
      const newHandlersList = handlers.filter((h) => h !== handler);

      if (newHandlersList.length > 0) {
        this.events.set(event, newHandlersList);
      } else {
        this.events.delete(event);
      }
    }
  }

  once(event, handler) {
    const wrappedHandler = (...args) => {
      handler(...args);
      this.off(event, wrappedHandler);
    };
    this.on(event, wrappedHandler);
  }

  emit(event, ...args) {
    const handlers = this.events.get(event);
    if (!handlers) return;
    for (const handler of handlers) {
      handler(...args);
    }
  }
}

describe("Event Emitter", () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  test("вызов одного обработчика", () => {
    const handler = mock(() => {});
    emitter.on("sum", handler);
    emitter.emit("sum");
    expect(handler).toHaveBeenCalled();
  });

  test("передача аргументов", () => {
    const handler = mock(() => {});
    emitter.on("args", handler);
    emitter.emit("args", 2, 3);
    expect(handler).toHaveBeenCalledWith(2, 3);
  });

  test("несколько обработчиков на событие", () => {
    const handler1 = mock(() => {});
    const handler2 = mock(() => {});

    emitter.on("event1", handler1);
    emitter.on("event1", handler2);
    emitter.emit("event1");

    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });

  test("`off` удаляет конкретный обработчик", () => {
    const handler1 = mock(() => {});
    const handler2 = mock(() => {});

    emitter.on("event1", handler1);
    emitter.on("event1", handler2);
    emitter.off("event1", handler2);
    emitter.emit("event1");

    expect(handler1).toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
  });

  test("`once` вызывается только один раз", () => {
    const handler = mock(() => {});
    emitter.once("event1", handler);

    emitter.emit("event1");
    expect(handler).toHaveBeenCalledTimes(1);
    emitter.emit("event1");

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test("вызов несуществующего события не падает", () => {
    expect(() => {
      const handler = mock(() => {});
      emitter.once("event1", handler);
      emitter.emit("event2");
    }).not.toThrow();
  });

  test("порядок выполнения обработчиков сохраняется", () => {
    const callOrder = [];
    const handler1 = mock(() => callOrder.push(1));
    const handler2 = mock(() => callOrder.push(2));
    const handler3 = mock(() => callOrder.push(3));

    emitter.on("event1", handler1);
    emitter.on("event1", handler2);
    emitter.on("event1", handler3);
    emitter.emit("event1");

    expect(callOrder).toEqual([1, 2, 3]);
    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
    expect(handler3).toHaveBeenCalled();
  });
});

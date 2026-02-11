class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    const [_, ...rest] = this.items;
    this.items = rest;
    return _ ?? null;
  }

  get peek() {
    return this.items[0] ?? null;
  }

  get size() {
    return this.items.length;
  }

  get isEmpty() {
    return this.size === 0;
  }
}

describe("My Queue", () => {
  let queue;

  beforeEach(() => {
    queue = new Queue();
  });

  test("is created empty", () => {
    expect(queue.isEmpty).toBe(true);
    expect(queue.peek).toBe(null);
    expect(queue.size).toBe(0);
  });

  test("is increased after enqueue", () => {
    expect(queue.isEmpty).toBe(true);
    queue.enqueue(1);
    expect(queue.size).toBe(1);
    queue.enqueue(2);
    expect(queue.size).toBe(2);
  });

  test("is decreases after dequeue", () => {
    expect(queue.isEmpty).toBe(true);
    queue.enqueue("1");
    expect(queue.isEmpty).toBe(false);
    queue.enqueue("3");
    expect(queue.size).toBe(2);
    queue.dequeue();
    expect(queue.size).toBe(1);
    queue.dequeue();
    expect(queue.size).toBe(0);
    expect(queue.isEmpty).toBe(true);
  });

  test("is shifting elements after dequeue", () => {
    queue.enqueue("1");
    queue.enqueue("2");
    queue.enqueue("3");

    expect(queue.size).toBe(3);
    expect(queue.peek).toBe("1");

    queue.dequeue();

    expect(queue.peek).toBe("2");
    expect(queue.size).toBe(2);
  });

  test("is following FIFO", () => {
    queue.enqueue("1");
    queue.enqueue("2");
    queue.enqueue("3");

    expect(queue.peek).toBe("1");

    const item = queue.dequeue();
    expect(item).toBe("1");

    expect(queue.peek).toBe("2");
  });

  test("is peek returns but not deletes", () => {
    const element = "1";
    queue.enqueue(element);
    expect(queue.size).toBe(1);

    expect(element).toBe(queue.peek);

    expect(queue.size).toBe(1);
  });

  test("is null when dequeue empty", () => {
    queue.enqueue("1");
    queue.enqueue("2");

    const one = queue.dequeue();
    expect(one).toBe("1");
    const two = queue.dequeue();
    expect(two).toBe("2");
    const none = queue.dequeue();
    expect(none).toBe(null);
  });

  test("is null when peek empty", () => {
    expect(queue.peek).toBe(null);

    queue.enqueue("1");
    expect(queue.peek).not.toBe(null);

    queue.enqueue("2");
    expect(queue.peek).not.toBe(null);

    queue.dequeue();
    expect(queue.peek).not.toBe(null);

    queue.dequeue();
    expect(queue.peek).toBe(null);
  });
});

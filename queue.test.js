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
    return this.peek;
  }

  get peek() {
    return this.items[0] || null;
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
    expect(queue.isEmpty).toBe(true);
  });

  it("is created empty", () => {
    expect(queue.peek).toBe(null);
    expect(queue.size).toBe(0);
  });

  it("is increases after enqueue", () => {
    expect(queue.isEmpty).toBe(true);
    queue.enqueue(1);
    expect(queue.size).toBe(1);
    queue.enqueue(2);
    expect(queue.size).toBe(2);
  });

  it("is decreases after dequeue", () => {
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

  it("is shifting elements after dequeue", () => {
    queue.enqueue("1");
    queue.enqueue("2");
    queue.enqueue("3");

    expect(queue.size).toBe(3);
    expect(queue.peek).toBe("1");
    expect(queue.items[queue.size - 1]).toBe("3");

    queue.dequeue();
    expect(queue.peek).toBe("2");
    expect(queue.items[queue.size - 1]).toBe("3");
    expect(queue.size).toBe(2);
  });

  it("is peek returns but not deletes", () => {
    const element = "1";
    queue.enqueue(element);
    expect(queue.size).toBe(1);

    const peek = queue.peek;

    expect(element).toBe(peek);

    expect(queue.size).toBe(1);
  });

  it("is null when dequeue empty", () => {
    queue.enqueue("1");
    queue.enqueue("2");

    expect(queue.dequeue()).toBe("2");
    expect(queue.dequeue()).toBe(null);
  });

  it("is null when peek empty", () => {
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

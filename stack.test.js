const errorCodes = {
  POPPING_OUT_OF_RANGE: "Popping out of range",
};

class Stack {
  constructor() {
    this.top = -1;
    this.items = {};
  }

  get peek() {
    return this.items[this.top];
  }

  push(value) {
    this.top += 1;
    this.items[this.top] = value;
  }

  pop() {
    if (this.top <= -1) {
      throw new Error("Popping out of range");
    }
    const item = this.items[this.top];
    delete this.items[this.top];
    this.top -= 1;
    return item;
  }
}

describe("My Stack", () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  test("is created empty", () => {
    expect(stack.peek).toBeUndefined();
    expect(stack.pop).toThrow();
  });

  test("can push to the top", () => {
    stack.push("🥑");
    expect(stack.peek).toBe("🥑");

    stack.push("🌽");
    expect(stack.peek).toBe("🌽");
  });

  test("can pop off", () => {
    stack.push("🥑");
    stack.push("🌽");

    expect(stack.peek).toBe("🌽");
    stack.pop();
    expect(stack.peek).toBe("🥑");
    stack.pop();
    expect(stack.peek).toBeUndefined();
  });

  test("pop returns popped item", () => {
    stack.push("🌽");

    const popCorn = stack.pop();

    expect(popCorn).toBe("🌽");
  });

  test("throws when popping empty stack", () => {
    expect(() => stack.pop()).toThrow(errorCodes.POPPING_OUT_OF_RANGE);
  });
});

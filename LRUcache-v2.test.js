// ```
// LRUCache(capacity)
//  ├ get(key)
//  ├ set(key, value)
// ```

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return undefined;
    }

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
      this.cache.set(key, value);
    } else {
      if (this.cache.size >= this.capacity) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }
      this.cache.set(key, value);
    }
  }

  get size() {
    return this.cache.size;
  }
}

describe("My LRUCache v2", () => {
  let cache;

  beforeEach(() => {
    cache = new LRUCache(2);
  });

  it("capacity is not exceeded when adding elements", () => {
    cache.set("a", 1);
    expect(cache.size).toBe(1);

    cache.set("b", 2);
    expect(cache.size).toBe(2);

    cache.set("c", 3);
    expect(cache.size).toBe(2);
  });

  it("removes least recently used key when overflowing", () => {
    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);

    expect(cache.get("a")).toBe(undefined);
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);
  });

  it("`get` updates freshness (makes item most recently used)", () => {
    cache.set("a", 1);
    cache.set("b", 2);

    cache.get("a");

    cache.set("c", 3);

    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBe(undefined);
    expect(cache.get("c")).toBe(3);
  });

  it("`get` of unknown key returns `undefined`", () => {
    expect(cache.get("unknown")).toBe(undefined);

    cache.set("a", 1);
    expect(cache.get("unknown")).toBe(undefined);
  });

  it("key value is overwritten correctly", () => {
    cache.set("a", 1);
    expect(cache.get("a")).toBe(1);

    cache.set("a", 2);
    expect(cache.get("a")).toBe(2);
    expect(cache.size).toBe(1);
  });

  it("example scenario: get(a) makes it freshest, then set(c,3) removes b", () => {
    cache.set("a", 1);
    cache.set("b", 2);

    expect(cache.get("a")).toBe(1);

    cache.set("c", 3);

    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBe(undefined);
    expect(cache.get("c")).toBe(3);
  });

  it("multiple gets update freshness correctly", () => {
    cache.set("a", 1);
    cache.set("b", 2);

    cache.get("b");
    cache.get("a");

    cache.set("c", 3);

    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBe(undefined);
    expect(cache.get("c")).toBe(3);
  });

  it("overwriting existing key updates value and freshness", () => {
    cache.set("a", 1);
    cache.set("b", 2);

    cache.set("a", 10);

    cache.set("c", 3);

    expect(cache.get("a")).toBe(10);
    expect(cache.get("b")).toBe(undefined);
    expect(cache.get("c")).toBe(3);
  });
});

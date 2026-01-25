class LRUCache {
  constructor(capacity = 4) {
    this.cap = capacity;
    this.rank = -1;
    this.items = [];
  }

  get(key) {
    const currentIndex = this.items.findIndex((i) => i.key === key);
    const current = this.items[currentIndex];
    if (currentIndex >= 0) {
      this.items.splice(currentIndex, 1);
      this.rank++;
      current.rank = this.rank;
      this.items.push(current);
      return current;
    }
  }

  set(key, value) {
    this.rank++;

    const currentIndex = this.items.findIndex((i) => i.key === key);
    if (currentIndex > 0) {
      const current = this.items[currentIndex];
      this.items.splice(currentIndex, 1);
      current.value = value;
      current.rank = this.rank;
      this.items.push(current);
      return this.items;
    }

    const newItem = {
      rank: this.rank,
      key,
      value,
    };

    if (this.items.length < this.cap) {
      this.items.push(newItem);
    } else {
      const [_, ...rest] = this.items;
      this.items = rest.concat(newItem);
    }
    return this.items;
  }

  get size() {
    return this.items.length;
  }
}

describe("My LRUCache", () => {
  let cache;
  const capacity = 4;

  beforeEach(() => {
    cache = new LRUCache(capacity);
    for (let i = 1; i <= capacity; i++) {
      cache.set(`item${i}`, `val${i}`);
    }
  });

  it("при добавлении элементов ёмкость не превышается", () => {
    expect(cache.size).toBe(4);
    cache.set("item5", "val5");
    expect(cache.size).toBe(capacity);
  });

  it("при переполнении удаляется самый редко использованный ключ", () => {
    cache.set("item5", "val5");
    const oldAgain = cache.get("item1");
    expect(oldAgain).toBe(undefined);
  });

  it("`get` обновляет «свежесть»", () => {
    const itemR1 = cache.get("item1").rank;
    const itemR2 = cache.get("item1").rank;
    expect(itemR1 < itemR2).toBe(true);
    const itemR3 = cache.get("item1").rank;
    expect(itemR2 < itemR3).toBe(true);
  });

  it("`get` неизвестного ключа → `undefined`", () => {
    expect(cache.get("heh")).toBe(undefined);
  });

  it("значение ключа перезаписывается корректно", () => {
    const key = "item1";
    const oldValue = cache.get(key).value;
    const newValue = "beb";
    cache.set(key, newValue);
    expect(oldValue).not.toBe(newValue);
  });
});

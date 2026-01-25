function romanToInt(str) {
  let res = 0;

  const number = (l) => {
    const letters = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };
    const h = letters[l];
    if (h) return h;
    throw new Error("wrong symbol");
  };

  for (let i = 0; i < str.length; i++) {
    const num = number(str[i]);

    if (i + 1 < str.length) {
      const num2 = number(str[i + 1]);
      if (num >= num2) {
        res += num;
      } else {
        res += num2 - num;
        i++;
      }
    } else {
      res += num;
    }
  }

  return res.toString();
}

describe("romanToInt", () => {
  it("III → 3", () => {
    expect(romanToInt("III")).toBe("3");
  });
  it("IV → 4", () => {
    expect(romanToInt("IV")).toBe("4");
  });
  it("IX → 9", () => {
    expect(romanToInt("IX")).toBe("9");
  });
  it("LVIII → 58", () => {
    expect(romanToInt("LVIII")).toBe("58");
  });
  it("MCMXCIV → 1994", () => {
    expect(romanToInt("MCMXCIV")).toBe("1994");
  });
  it("lower-case строки", () => {
    expect(() => romanToInt("be")).toThrow();
  });
  it("некорректные символы", () => {
    expect(() => romanToInt("be")).toThrow();
  });
});

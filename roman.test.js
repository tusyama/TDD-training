function romanToInt(str) {
  if (typeof str !== "string") {
    throw new TypeError();
  }
  if (str.length < 1) {
    throw new Error("string is too short");
  }
  if (/[a-z]/.test(str)) {
    throw new Error("no lowercase allowed");
  }

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

  return res;
}

// function intToRoman(number) {

// }

describe("romanToInt", () => {
  test("V → 5", () => {
    expect(romanToInt("V")).toBe(5);
  });

  test("III → 3", () => {
    expect(romanToInt("III")).toBe(3);
  });

  test("IV → 4", () => {
    expect(romanToInt("IV")).toBe(4);
  });

  test("IX → 9", () => {
    expect(romanToInt("IX")).toBe(9);
  });

  test("LVIII → 58", () => {
    expect(romanToInt("LVIII")).toBe(58);
  });

  test("MCMXCIV → 1994", () => {
    expect(romanToInt("MCMXCIV")).toBe(1994);
  });

  test("lower-case строки", () => {
    expect(() => romanToInt("be")).toThrow();
  });

  test("некорректные символы", () => {
    expect(() => romanToInt("hello")).toThrowError("no lowercase allowed");
    expect(() => romanToInt("ABC")).toThrowError("wrong symbol");
    expect(() => romanToInt(1)).toThrowError(TypeError);
    expect(() => romanToInt("")).toThrowError("string is too short");
  });
});

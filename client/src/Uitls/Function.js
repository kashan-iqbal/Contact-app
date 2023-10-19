export const data = [
    {
      name: "kashan",
      number: "03198167101",
    },
    {
      name: "ahed",
      number: "03448167101",
    },
    {
      name: "imran muhammed iqbal",
      number: "03238167101",
    },
    {
      name: "fahad",
      number: "03338167101",
    },
    {
      name: "abeer",
      number: "03198167101",
    },
    {
      name: "irfan",
      number: "03278167101",
    },
    {
      name: "irfan",
      number: "03198167101",
    },
    {
      name: "irfan",
      number: "03388167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    },
    {
      name: "muzammil",
      number: "03198167101",
    }
  ];
  export const touppercase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  export const network = (num) => {
    const zong = ["11", "12", "13", "14", "15","16", "17", "18", "19", "20"];
    const telenor = ["41", "42", "43", "44", "46", "47", "48", "49", "40"];
    const Ufone = ["31", "32", "33", "34", "36", "37", "38", "39", "30"];
    const jazz = ["21", "22", "23", "24", "26", "27", "28", "29"];
  
    if (zong.includes(num)) {
      return "Zong";
    }
    if (telenor.includes(num)) {
      return "Telenor";
    }
    if (Ufone.includes(num)) {
      return "Ufone";
    }
    if (jazz.includes(num)) {
      return "Jazz";
    }
  };

  export const color = () => {
    const random = [
      'Gray', 'Blue', 'Green', 'Red', 'Orange', 'Purple', 'Pink', 'Brown', 'Teal', 'Navy'
    ];
    const randomIndex = Math.floor(Math.random() * random.length);
    const randomColor = random[randomIndex];
    return randomColor;
  };
  
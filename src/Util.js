import data from "./input.json";

const MOVE = "Move";
const BOMB = "Bomb";
const MISSES = "Misses";
const HEADSHOT = "Headshot";
const BODY = "Body";

const gradding = {
  [MOVE]: (value) => {
    if (value < 105) return 100;
    if (value >= 105 && value < 250) return 70;
    return 0;
  },
  [BOMB]: (value) => value, // !? UNCLEAR: 100 if <40000 mSec. Else – 0.
  [MISSES]: (value) => {
    if (value < 60) return 100;
    if (value >= 60 && value < 400) return 70;
    return 0;
  },
  [HEADSHOT]: () => 100,
  [BODY]: () => 80,
};

const getGrade = (type, value) => {
  return gradding[type](value);
};

function Util() {
  this.rawData = data;

  const processedData = data.map((o) => {
    const { type, value } = o;
    o["grade"] = getGrade(type, value);
    return o;
  });

  this.processedData = processedData;
}

export default new Util();

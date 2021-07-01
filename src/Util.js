import data from "./input.json";

const MOVE = "Move";
const BOMB = "Bomb";
const MISSES = "Misses";
const HEADSHOT = "Headshot";
const BODY = "Body";

const weights = {
  [MOVE]: 0.85,
  [BOMB]: 0.15,
  [MISSES]: 0.15,
  [HEADSHOT]: 0.2,
  [BODY]: 0.65,
};

const gradding = {
  [MOVE]: (value) => {
    if (value < 105) return 100;
    if (value >= 105 && value < 250) return 70;
    return 0;
  },
  [BOMB]: (value) => (value ? 100 : 0), // !? UNCLEAR: 100 if <40000 mSec. Else – 0.
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

const isSpeed = (type) => {
  return [MOVE, BOMB].includes(type);
};

const getAvg = (arr) => {
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length;
};

const getSpeedScore = (avgs) => {
  const moveAvgScore = getAvg(avgs[MOVE]);
  const bombAvgScore = getAvg(avgs[BOMB]);
  return moveAvgScore * weights[MOVE] + bombAvgScore * weights[BOMB];
};
const getAccuracyScore = (avgs) => {
  const missesAvgScore = getAvg(avgs[MISSES]);
  const headshotAvgScore = getAvg(avgs[HEADSHOT]);
  const bodyAvgScore = getAvg(avgs[BODY]);
  return (
    missesAvgScore * weights[MISSES] +
    headshotAvgScore * weights[HEADSHOT] +
    bodyAvgScore * weights[BODY]
  );
};

function Util() {
  const speedData = [];
  const accuracyData = [];

  const avgs = {
    [MOVE]: [],
    [BOMB]: [],
    [MISSES]: [],
    [HEADSHOT]: [],
    [BODY]: [],
  };

  data.forEach((o) => {
    const { type, value } = o;
    o["grade"] = getGrade(type, value);
    debugger;
    avgs[type].push(value);
    isSpeed(type) ? speedData.push(o) : accuracyData.push(o);
  });

  this._speedSkillScore = getSpeedScore(avgs);
  this._accuracySkillScore = getAccuracyScore(avgs);

  this._speedData = speedData;
  this._accuracyData = accuracyData;

  const getProcessedData = () => ({
    speedData: this._speedData,
    accuracyData: this._accuracyData,
  });

  const getSkillScores = () => {
    return {
      speedSkillScore: this._speedSkillScore,
      accuracySkillScore: this._accuracySkillScore,
    };
  };

  return { getProcessedData, getSkillScores };
}

export default new Util();

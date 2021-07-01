import Chart from "./Chart";
import Util from "./Util";
import "./App.css";

const INPUT_LINK =
  "https://raw.githubusercontent.com/barhoring/Edge/master/src/input.json";
function App() {
  const { speedData, accuracyData } = Util.getProcessedData();
  const { speedSkillScore, accuracySkillScore } = Util.getSkillScores();
  return (
    <div className="App">
      <h1>Edge Graphs</h1>
      <a href={INPUT_LINK}>input data</a>
      <Chart data={speedData} title="Speed" score={speedSkillScore} />
      <Chart data={accuracyData} title="Accuracy" score={accuracySkillScore} />
    </div>
  );
}

export default App;

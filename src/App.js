import logo from "./logo.svg";
import Chart from "./Chart";
import Util from "./Util";
import "./App.css";

function App() {
  const { speedData, accuracyData } = Util.getProcessedData();
  const { speedSkillScore, accuracySkillScore } = Util.getSkillScores();
  return (
    <div className="App">
      <div>{JSON.stringify(Util.getProcessedData())}</div>
      <Chart data={speedData} title="Speed" score={speedSkillScore} />
      <Chart data={accuracyData} title="Accuracy" score={accuracySkillScore} />
    </div>
  );
}

export default App;

import './App.css';
import SimulationComponent from './components/SimulationComponent/SimulationComponent';

function App() {
  const currentSavings = 13000000; // replace with your desired value
  const currentSalary = 8800000; // replace with your desired value
  const currentInvestmentReturnRate = 5; // replace with your desired value
  return (
    <div className="App">
      <header className="App-header">
        <p>
          サイドFIREシミュレーション
        </p>
      </header>
      <SimulationComponent currentSavings={currentSavings} currentSalary={currentSalary} currentInvestmentReturnRate={currentInvestmentReturnRate} />
    </div>
  );
}

export default App;

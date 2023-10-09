import './App.css';
import SimulationComponent from './components/SimulationComponent/SimulationComponent';

function App() {
  const currentSavings = 10000000; // replace with your desired value
  const currentSalary = 5000000; // replace with your desired value
  const currentInvestmentReturnRate = 5; // replace with your desired value
  const currentAverageAnnualExpenditure = 1800000; // replace with your desired value
  return (
    <div className="App">
      <header className="App-header">
        <p>
          サイドFIREシミュレーション
        </p>
      </header>
      <SimulationComponent currentSavings={currentSavings} currentSalary={currentSalary} currentInvestmentReturnRate={currentInvestmentReturnRate} currentAverageAnnualExpenditure={currentAverageAnnualExpenditure} />
    </div>
  );
}


export default App;

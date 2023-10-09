import { Box, Heading } from '@chakra-ui/react';
import './App.css';
import SimulationComponent from './components/SimulationComponent/SimulationComponent';

function App() {
  const currentSavings = 10000000; // replace with your desired value
  const currentSalary = 5000000; // replace with your desired value
  const currentInvestmentReturnRate = 5; // replace with your desired value
  const currentAverageAnnualExpenditure = 1800000; // replace with your desired value
  return (
    <Box padding={10}>
      <div className="App">
        <Heading mb={5} size='md'>サイドFIREシミュレーション</Heading>
        <SimulationComponent currentSavings={currentSavings} currentSalary={currentSalary} currentInvestmentReturnRate={currentInvestmentReturnRate} currentAverageAnnualExpenditure={currentAverageAnnualExpenditure} />
      </div>
    </Box>
  );
}


export default App;

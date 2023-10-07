import React, { useState } from 'react';
import './SimulationComponent.css';

interface SimulationComponentProps {
  currentSavings: number;
  currentSalary: number;
  currentInvestmentReturnRate: number;
}

type SimulationInput = {
  // age: number;
  currentSavings: number;
  currentSalary: number;
  currentInvestmentReturnRate: number;
};

type SimulationResult = {
  yearsToSideFire: number;
  finalSavings: number;
};

const SimulationComponent: React.FC<SimulationComponentProps> = ({ currentSavings, currentSalary, currentInvestmentReturnRate }) => {
  const [savings, setSavings] = useState(currentSavings);
  const [salary, setSalary] = useState(currentSalary);
  const [investmentReturnRate, setInvestmentReturnRate] = useState(currentInvestmentReturnRate);
  const [simulationResult, setSimulationResult] = useState<SimulationResult>({ yearsToSideFire: 0, finalSavings: 0 });

  const handleSavingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSavings(Number(event.target.value));
  };

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(Number(event.target.value));
  };

  const handleInvestmentReturnRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentReturnRate(Number(event.target.value));
  };

  const calculateSideFire = ({
    // age,
    currentSavings,
    currentSalary,
    currentInvestmentReturnRate,
  }: SimulationInput): SimulationResult => {
    let yearsToSideFire = 0;
    let futureSavings = currentSavings;

    const targetSavings = currentSalary * 25; // サイドFIREの目標額（25倍の年収）
    const annualSavings = currentSalary * 0.2; // 年間の貯金額（年収の20%と仮定）

    while (futureSavings < targetSavings) {
      futureSavings += annualSavings; // 年間の貯金を追加
      futureSavings *= 1 + currentInvestmentReturnRate / 100; // 投資利回りを考慮
      yearsToSideFire++;
    }

    return {
      yearsToSideFire: yearsToSideFire,
      finalSavings: futureSavings,
    };
  };

  const handleCalculateClick = () => {
    const result = calculateSideFire({ currentSavings: savings, currentSalary: salary, currentInvestmentReturnRate: investmentReturnRate });
    setSimulationResult(result);
  };

  return (
    <div className="SimulationComponent" data-testid="SimulationComponent">
      SimulationComponent Component

      {/* 現在の貯金額を入力 */}
      <p>現在の貯金額: {currentSavings}</p>
      <label htmlFor="savings-input">現在の貯金額を入力:</label>
      <input id="savings-input" type="number" value={savings} onChange={handleSavingsChange} />

      {/* 現在の年収を入力 */}
      <p>現在の年収: {currentSalary}</p>
      <label htmlFor="salary-input">年収を入力:</label>
      <input id="salary-input" type="number" value={salary} onChange={handleSalaryChange} />

      {/* 投資利回りを入力 */}
      <p>現在の投資利回り: {currentInvestmentReturnRate}</p>
      <label htmlFor="investment-return-rate-input">投資利回りを入力:</label>
      <input id="investment-return-rate-input" type="number" value={investmentReturnRate} onChange={handleInvestmentReturnRateChange} />

      <p>サイドFIREまで残り {simulationResult.yearsToSideFire}年</p>
      <p>サイドFIRE時の資産 {Math.floor(simulationResult.finalSavings)}円</p>

      <button onClick={handleCalculateClick}>Calculate</button>

    </div>
  );
}

export default SimulationComponent;

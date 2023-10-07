import React, { useState } from 'react';
import './SimulationComponent.css';
import AssetGrowthChartComponent from '../AssetGrowthChartComponent/AssetGrowthChartComponent';

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
  futureSavingsHistory: number[];
  futureSavingsHistoryYears: number[];
};

const SimulationComponent: React.FC<SimulationComponentProps> = ({ currentSavings, currentSalary, currentInvestmentReturnRate }) => {
  const [savings, setSavings] = useState(currentSavings);
  const [salary, setSalary] = useState(currentSalary);
  const [investmentReturnRate, setInvestmentReturnRate] = useState(currentInvestmentReturnRate);
  const [simulationResult, setSimulationResult] = useState<SimulationResult>({ yearsToSideFire: 0, finalSavings: 0, futureSavingsHistory: [], futureSavingsHistoryYears: [] });

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

    // const targetSavings = currentSalary * 25; // サイドFIREの目標額（25倍の年収）
    const targetSavings = 45000000; // 一旦単身用のシミュレーションとして45000万固定、いずれ他の条件を考慮しても表地が変わるように修正
    const annualSavings = currentSalary * 0.2; // 年間の貯金額（年収の20%と仮定）
    const futureSavingsHistory: number[] = [currentSavings];
    const currentYear = new Date().getFullYear();
    const futureSavingsHistoryYears: number[] = [currentYear];

    while (futureSavings < targetSavings) {
      futureSavings += annualSavings; // 年間の貯金を追加
      futureSavings *= 1 + currentInvestmentReturnRate / 100; // 投資利回りを考慮
      yearsToSideFire++;
      futureSavingsHistory.push(Math.floor(futureSavings));
      futureSavingsHistoryYears.push(currentYear + yearsToSideFire)
    }

    return {
      yearsToSideFire: yearsToSideFire,
      finalSavings: futureSavings,
      futureSavingsHistory: futureSavingsHistory,
      futureSavingsHistoryYears: futureSavingsHistoryYears,
    };
  };

  const handleCalculateClick = () => {
    const result = calculateSideFire({ currentSavings: savings, currentSalary: salary, currentInvestmentReturnRate: investmentReturnRate });
    setSimulationResult(result);
  };

  return (
    <div className="SimulationComponent" data-testid="SimulationComponent">
      {/* 現在の資産額を入力 */}
      <p>現在の資産額: {currentSavings.toLocaleString()}円</p>
      <label htmlFor="savings-input">現在の資産額を入力:</label>
      <input id="savings-input" type="number" value={savings} onChange={handleSavingsChange} />

      {/* 現在の年収を入力 */}
      <p>現在の年収: {currentSalary.toLocaleString()}円</p>
      <label htmlFor="salary-input">年収を入力:</label>
      <input id="salary-input" type="number" value={salary} onChange={handleSalaryChange} />

      {/* 投資利回りを入力 */}
      <p>現在の投資利回り: {currentInvestmentReturnRate}%</p>
      <label htmlFor="investment-return-rate-input">投資利回りを入力:</label>
      <input id="investment-return-rate-input" type="number" value={investmentReturnRate} onChange={handleInvestmentReturnRateChange} />

      <p>
        <button onClick={handleCalculateClick}>計算する</button>
      </p>

      <p>サイドFIREまで残り {simulationResult.yearsToSideFire}年</p>
      <p>サイドFIRE時の資産 {Math.floor(simulationResult.finalSavings).toLocaleString()}円</p>
      <AssetGrowthChartComponent years={simulationResult.futureSavingsHistoryYears} futureSavingsHistory={simulationResult.futureSavingsHistory} />
      <p>4%ルールに基づいて算出しています。（年間支出は180万円想定）</p>
      {/*
      単身の年間支出平均は180万らしい（2,3,4人では？）
      逆算すると4%ルールだと180万×25=4500万必要
      */}

      {/* <p>サイドFIREまでの資産推移</p>
      <ul>
        {simulationResult.futureSavingsHistory.map((savings, index) => (
          <li key={index}>{Math.floor(savings).toLocaleString()}円</li>
        ))}
      </ul> */}

    </div>
  );
}

export default SimulationComponent;

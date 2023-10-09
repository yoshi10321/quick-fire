import React, { useState, useEffect } from "react";
import "./SimulationComponent.css";
import AssetGrowthChartComponent from "../AssetGrowthChartComponent/AssetGrowthChartComponent";
import {
  Input,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  Box,
  AccordionPanel,
  AccordionItem,
  Stack,
  Card,
  CardBody,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tooltip,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

interface SimulationComponentProps {
  currentSavings: number;
  currentSalary: number;
  currentInvestmentReturnRate: number;
  currentAverageAnnualExpenditure: number;
}

type SimulationInput = {
  // age: number;
  currentSavings: number;
  currentSalary: number;
  currentInvestmentReturnRate: number;
  averageAnnualExpenditure: number;
};

type SimulationResult = {
  yearsToSideFire: number;
  finalSavings: number;
  futureSavingsHistory: number[];
  futureSavingsHistoryYears: number[];
};

const SimulationComponent: React.FC<SimulationComponentProps> = ({
  currentSavings,
  currentSalary,
  currentInvestmentReturnRate,
  currentAverageAnnualExpenditure = 1800000,
}) => {
  const [savings, setSavings] = useState(currentSavings);
  const [salary, setSalary] = useState(currentSalary);
  const [investmentReturnRate, setInvestmentReturnRate] = useState(
    currentInvestmentReturnRate
  );
  const [averageAnnualExpenditure, setAverageAnnualExpenditure] = useState(
    currentAverageAnnualExpenditure
  );
  const [simulationResult, setSimulationResult] = useState<SimulationResult>({
    yearsToSideFire: 0,
    finalSavings: 0,
    futureSavingsHistory: [],
    futureSavingsHistoryYears: [],
  });

  const handleSavingsChange = (valueAsString: string, valueAsNumber: number) => {
    setSavings(valueAsNumber);
  };

  const handleSalaryChange = (valueAsString: string, valueAsNumber: number) => {
    setSalary(valueAsNumber);
  };

  const handleInvestmentReturnRateChange = (
    valueAsString: string, valueAsNumber: number
  ) => {
    setInvestmentReturnRate(Number(valueAsNumber));
  };

  const handleAverageAnnualExpenditureChange = (
    valueAsString: string, valueAsNumber: number
  ) => {
    setAverageAnnualExpenditure(valueAsNumber);
  };

  const calculateSideFire = ({
    // age,
    currentSavings,
    currentSalary,
    currentInvestmentReturnRate,
    averageAnnualExpenditure,
  }: SimulationInput): SimulationResult => {
    let yearsToSideFire = 0;
    let futureSavings = currentSavings;

    const targetSavings = averageAnnualExpenditure * 25; // 4%ルールに基づき年間支出の25倍を目標とする
    // const targetSavings = 45000000; // 一旦単身用のシミュレーションとして45000万固定、いずれ他の条件を考慮しても表地が変わるように修正
    const annualSavings = currentSalary * 0.2; // 年間の貯金額（年収の20%と仮定）
    const futureSavingsHistory: number[] = [currentSavings];
    const currentYear = new Date().getFullYear();
    const futureSavingsHistoryYears: number[] = [currentYear];

    while (futureSavings < targetSavings) {
      futureSavings += annualSavings; // 年間の貯金を追加
      futureSavings *= 1 + currentInvestmentReturnRate / 100; // 投資利回りを考慮
      yearsToSideFire++;
      futureSavingsHistory.push(Math.floor(futureSavings));
      futureSavingsHistoryYears.push(currentYear + yearsToSideFire);
    }

    return {
      yearsToSideFire: yearsToSideFire,
      finalSavings: futureSavings,
      futureSavingsHistory: futureSavingsHistory,
      futureSavingsHistoryYears: futureSavingsHistoryYears,
    };
  };

  useEffect(() => {
    const result = calculateSideFire({
      currentSavings: savings,
      currentSalary: salary,
      currentInvestmentReturnRate: investmentReturnRate,
      averageAnnualExpenditure: averageAnnualExpenditure,
    });
    setSimulationResult(result);
  }, [savings, salary, investmentReturnRate, averageAnnualExpenditure]);

  return (
    <div className="SimulationComponent" data-testid="SimulationComponent">
      {/* 現在の資産額を入力 */}
      <Stack spacing={3}>
        <Card>
          <CardBody>
            <Stack spacing={3}>
              <Text>現在の資産額: {savings}円</Text>
              <NumberInput maxW="200px" onChange={handleSavingsChange} value={savings} defaultValue={savings}>
                <NumberInputField id="savings-input"  />
              </NumberInput>

              {/* 現在の年収を入力 */}
              <Text>年収: {salary}円</Text>
              <NumberInput maxW="200px" onChange={handleSalaryChange} value={salary} defaultValue={salary}>
                <NumberInputField id="salary-input" />
              </NumberInput>

              {/* 投資利回りを入力 */}
              <Text>投資利回り: {investmentReturnRate}%</Text>
              <NumberInput maxW="200px" step={0.1} onChange={handleInvestmentReturnRateChange} value={investmentReturnRate} defaultValue={investmentReturnRate}>
                <NumberInputField id="investment-return-rate-input" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>

              </NumberInput>

              {/* この下はオプション */}
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        その他の設定
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text>年間支出金額: {averageAnnualExpenditure}円</Text>
                    <Text fontSize='xs'>単身の年間支出平均は180万円</Text>
                    <NumberInput maxW="200px" value={averageAnnualExpenditure} onChange={handleAverageAnnualExpenditureChange}>
                      <NumberInputField id="average-annual-expenditure-input" />
                    </NumberInput>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Text>サイドFIREまで {simulationResult.yearsToSideFire}年</Text>
            <Text>
              サイドFIRE時の資産{" "}
              {Math.floor(simulationResult.finalSavings).toLocaleString()}円
            </Text>
            <AssetGrowthChartComponent
              years={simulationResult.futureSavingsHistoryYears}
              futureSavingsHistory={simulationResult.futureSavingsHistory}
            />
            <Text fontSize='xs'>※4%ルールに基づいて算出しています。</Text>
            <Text fontSize='xs'>※年間の貯金額を年収の20%と仮定して算出しています。</Text>
          </CardBody>
        </Card>
      </Stack>
      {/*
      単身の年間支出平均は180万らしい（2,3,4人では？）
      逆算すると4%ルールだと180万×25=4500万必要
      */}
    </div>
  );
};

export default SimulationComponent;

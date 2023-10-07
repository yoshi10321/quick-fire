import React, { FC, useRef, useEffect } from 'react';
import './AssetGrowthChartComponent.css';
import Chart from 'chart.js/auto';

interface AssetGrowthChartComponentProps {
  years: number[];
  futureSavingsHistory: number[];
}

const AssetGrowthChartComponent: FC<AssetGrowthChartComponentProps> = ({ years, futureSavingsHistory }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    console.log("Chart Component")
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // デモデータとして用いる配列
        // const years = years;
        const assetGrowth = futureSavingsHistory;

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy(); // 既存の Chart インスタンスを破棄する
        }

        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: years,
            datasets: [
              {
                label: "資産の増加",
                data: assetGrowth,
                borderColor: "rgba(75,192,192,1)",
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              // xAxes: [
              //   {
              //     type: "linear",
              //     position: "bottom",
              //     ticks: {
              //       min: Math.min(...years),
              //       max: Math.max(...years),
              //     },
              //   },
              // ],
            },
          },
        });
      }
    }
  }, [years, futureSavingsHistory]);

  return <canvas ref={chartRef}></canvas>;
};

export default AssetGrowthChartComponent;

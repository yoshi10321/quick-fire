import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AssetGrowthChartComponent from './AssetGrowthChartComponent';

describe('<AssetGrowthChartComponent />', () => {
  test('it should mount', () => {
    // const props: AssetGrowthChartComponentProps = {
    //   years: [2021, 2022, 2023],
    //   futureSavingsHistory: [1000, 2000, 3000]
    // };
    render(<AssetGrowthChartComponent years={[2021, 2022, 2023]} futureSavingsHistory={[1000, 2000, 3000]} />);

    // render(<AssetGrowthChartComponent />);
    
    const assetGrowthChartComponent = screen.getByTestId('AssetGrowthChartComponent');

    // expect(assetGrowthChartComponent).toBeInTheDocument();
  });
});
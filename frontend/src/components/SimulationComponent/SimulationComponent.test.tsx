import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SimulationComponent from './SimulationComponent';

describe('<SimulationComponent />', () => {
  test('it should mount', () => {
    render(<SimulationComponent currentSavings={0} currentSalary={0} currentInvestmentReturnRate={0} />);
    
    const simulationComponent = screen.getByTestId('SimulationComponent');

    expect(simulationComponent).toBeInTheDocument();
  });
});
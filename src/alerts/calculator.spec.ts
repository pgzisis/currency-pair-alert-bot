import { Rate } from '../interfaces/rate.interface';
import { Calculator } from './calculator';

describe('Calculator', () => {
  const previousRate: Rate = {
    ask: '500',
    bid: '500',
    currency: 'USD',
  };
  const currentRate: Rate = {
    ask: '1000',
    bid: '1000',
    currency: 'USD',
  };

  beforeAll(() => {
    process.env.PRICE_OSCILLATION_PERCENTAGE = '0.01';
  });

  describe('calculatePercentageChange', () => {
    it('should return the percentage change between two numbers', () => {
      const calculator = new Calculator(previousRate, currentRate);

      expect(calculator.calculatePercentageChange()).toBe(100);
    });

    it('should throw an error if an ask is not a valid number', () => {
      const previousRateWithInvalidAsk = {
        ...previousRate,
        ask: 'abc',
      };
      const calculator = new Calculator(
        previousRateWithInvalidAsk,
        currentRate,
      );

      expect(() => {
        calculator.calculatePercentageChange();
      }).toThrow();
    });
  });

  describe('isSignificantChange', () => {
    it('should return true when the percentage change is significant', () => {
      const calculator = new Calculator(previousRate, currentRate);

      expect(calculator.isChangeSignificant()).toBe(true);
    });

    it('should return false when the percentage change is not significant', () => {
      const calculator = new Calculator(previousRate, previousRate);

      expect(calculator.isChangeSignificant()).toBe(false);
    });
  });
});

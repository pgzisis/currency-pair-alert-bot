import { Rate } from '../interfaces/rate.interface';
import { Oscillation } from './oscillation';

describe('Oscillation', () => {
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
      const oscillation = new Oscillation(previousRate, currentRate);

      expect(oscillation.calculatePercentageChange()).toBe(100);
    });

    it('should throw an error if an ask is not a valid number', () => {
      const previousRateWithInvalidAsk = {
        ...previousRate,
        ask: 'abc',
      };
      const oscillation = new Oscillation(
        previousRateWithInvalidAsk,
        currentRate,
      );

      expect(() => {
        oscillation.calculatePercentageChange();
      }).toThrow();
    });
  });

  describe('isSignificant', () => {
    it('should return true when the percentage change is significant', () => {
      const oscillation = new Oscillation(previousRate, currentRate);

      expect(oscillation.isSignificant()).toBe(true);
    });

    it('should return false when the percentage change is not significant', () => {
      const oscillation = new Oscillation(previousRate, previousRate);

      expect(oscillation.isSignificant()).toBe(false);
    });
  });
});

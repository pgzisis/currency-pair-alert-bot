import { Rate } from '../interfaces/rate.interface';

export class Oscillation {
  public constructor(
    private readonly previousRate: Rate,
    private readonly currentRate: Rate,
  ) {}

  private priceOscillationPercentage =
    Number(process.env.PRICE_OSCILLATION_PERCENTAGE) || 0.01;

  public calculatePercentageChange(): number {
    const previousAsk = this.convertStringToNumber(this.previousRate.ask);
    const currentAsk = this.convertStringToNumber(this.currentRate.ask);

    return ((currentAsk - previousAsk) / previousAsk) * 100;
  }

  public isSignificant(): boolean {
    const percentageChange = this.calculatePercentageChange();
    const absolutePercentageChange = Math.abs(percentageChange);

    return absolutePercentageChange >= this.priceOscillationPercentage;
  }

  private convertStringToNumber(value: string): number {
    const valueAsNumber = Number(value);
    if (isNaN(valueAsNumber)) {
      throw new Error(
        'String to number conversion failed. Is the value a valid number?',
      );
    }

    return valueAsNumber;
  }
}

import { Rate } from 'src/interfaces/rate.interface';

export class Calculator {
  public constructor(
    private readonly previousRate: Rate,
    private readonly latestRate: Rate,
  ) {}

  private readonly limit = 0.01;

  public calculatePercentageChange(): number {
    const previousAsk = this.convertStringToNumber(this.previousRate.ask);
    const latestAsk = this.convertStringToNumber(this.latestRate.ask);

    return ((latestAsk - previousAsk) / previousAsk) * 100;
  }

  public isChangeSignificant(): boolean {
    const percentageChange = this.calculatePercentageChange();
    const absoluteChange = Math.abs(percentageChange);

    return absoluteChange >= this.limit;
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

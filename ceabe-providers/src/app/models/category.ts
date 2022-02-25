export class Category {
  public code: number;
  public name: string;
  public amount: number;

  constructor(code: number, name: string, amount: number) {
    this.name = name;
    this.code = code;
    this.amount = amount;
  }


}

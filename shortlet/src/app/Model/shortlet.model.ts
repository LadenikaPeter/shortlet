export class Shortlet {
  constructor(
    public address: string,
    public id: number,
    public name: string,
    public pictures: Array<string>,
    public price: string,
    public rating: string
  ) {}
}

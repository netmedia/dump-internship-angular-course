export class Item {
  public id:                  number;
  public name:                string;
  public boughtDate:          string;
  public warrantyExpiration:  string;
  public price:               number;
  public currency:            string;

  constructor(item: any) {
    let boughtDate          = new Date(item.boughtDate);
    let warrantyExpiration  = new Date(item.warrantyUntilDate);

    this.id                 = item._id;
    this.name               = item.name;
    this.boughtDate         = item.boughtDate ? item.boughtDate.slice(0, 10) : null;
    this.warrantyExpiration = item.warrantyUntilDate.slice(0, 10);
    this.price              = item.price.amount;
    this.currency           = item.price.currency;
  }
}
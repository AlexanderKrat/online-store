import Page from "../../templates/page";

class CartPage extends Page{
  static TextObject = {
    MainTitle: 'Cart page'
  }
  constructor(id:string){
    super(id)
  }

  render(){
    const title = this.CreateHeaderTitle(CartPage.TextObject.MainTitle)
    this.container.append(title)
    return this.container;
  }
}

export default CartPage
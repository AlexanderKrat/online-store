import Page from "../../templates/page";

class ProductPage extends Page{
  static TextObject = {
    MainTitle: 'Product page'
  }
  constructor(id:string){
    super(id)
  }

  render(){
    const title = this.CreateHeaderTitle(ProductPage.TextObject.MainTitle)
    this.container.append(title)
    return this.container;
  }
}

export default ProductPage
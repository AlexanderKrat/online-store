import Page from "../../templates/page";

class StorePage extends Page{
  static TextObject = {
    MainTitle: 'Store page'
  }
  constructor(id:string){
   super(id)
  }

  render(){
    const title = this.CreateHeaderTitle(StorePage.TextObject.MainTitle);
    this.container.append(title);
    return this.container
  }
}

export default StorePage 
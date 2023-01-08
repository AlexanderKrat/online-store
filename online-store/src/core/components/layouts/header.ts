import Component from "../components";
import { PageIds } from "../../pages/app";
 const Buttons = [
  {
  id: PageIds.StorePage,
  text: 'Online Store', 
}
];
class Header extends Component{
  constructor(tagName:string, className:string){
    super(tagName, className);
  }
  renderPageButtons(){
    const container = document.createElement('div');
    container.className = "container";
    const collapse = document.createElement('div');
    collapse.className = "collapse navbar-collapse";
 
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.className = "navbar-brand";
      const nameStore = document.createElement('span');
      nameStore.className = "text-success fs-1"
      buttonHTML.href = `#${button.id}`;
      nameStore.innerText = button.text;
      buttonHTML.append(nameStore);
      collapse.append(buttonHTML);
    });
    const card_block = document.createElement('div');
    card_block.className = "card-block collapse navbar-collapse justify-content-end";
 
    const count = document.createElement('div');
    count.className = "count d-grid align-content-around text-center";
    count.innerText = "100";
    const img = document.createElement('img');
    img.src = "data:image/png;base64,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";
    card_block.append(count,img);
    container.append(collapse,card_block);
    this.container.append(container);
  }
  render(){
    this.renderPageButtons();
    return this.container
  }
}
export default Header;


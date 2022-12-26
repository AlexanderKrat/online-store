import Component from "../templates/components";
class Header extends Component {
  constructor(tagName:string, className:string){
    super(tagName,className)
  }

  render(){
    return this.container
  }
}
export default Header;
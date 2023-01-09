import Page from "../../components/page";

class ErrorPage extends Page {
  private errorType:string;

  static TextObject: { [prop:string]:string } = {
    '404':'Error! Page was not found.'
  };
  constructor(id:string, errorType:string){
    super(id); 
    this.errorType = errorType;
  }
  render() {
    const title = this.CreateHeaderTitle(ErrorPage.TextObject[this.errorType])
    this.container.append(title)
    return this.container
  }
}

export default ErrorPage
class App {
  private container:HTMLElement;
  private initialPage;

  constructor(){
    this.container = document.body;
  }

  run(){
    this.container.innerHTML = 'Single Page Application'
  }
}
export default App;
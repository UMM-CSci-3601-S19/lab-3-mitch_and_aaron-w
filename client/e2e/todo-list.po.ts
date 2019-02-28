import {browser, by, element, Key} from 'protractor';

export class TodoPage {
  navigateTo() {
    return browser.get('/todos');
  }

  //http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
  highlightElement(byObject) {
    function setStyle(element, style) {
      const previous = element.getAttribute('style');
      element.setAttribute('style', style);
      setTimeout(() => {
        element.setAttribute('style', previous);
      }, 200);
      return "highlighted";
    }

    return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
  }

  getTodoTitle() {
    let title = element(by.id('todo-list-title')).getText();
    this.highlightElement(by.id('todo-list-title'));

    return title;
  }

  typeAnId(id: string) {
    let input = element(by.id('todoId'));
    input.click();
    input.sendKeys(id);
  }

  selectUpKey() {
    browser.actions().sendKeys(Key.ARROW_UP).perform();
  }

  getTodoByStatus(status: string) {
    let input = element(by.id('todoStatus'));
    input.click();
    input.sendKeys(status);
    input.sendKeys(Key.TAB);
  }

  getTodoByOwner(owner: string) {
    let input = element(by.id('todoOwner'));
    input.click();
    input.sendKeys(owner);
    input.sendKeys(Key.TAB);
  }

  getTodoByCategory() {
    let input = element(by.id('todoStatus'));
    input.click();
    input.sendKeys(Key.TAB);
  }

  getTodoByBody(body: string) {
    let input = element(by.id('todoBody'));
    input.click();
    input.sendKeys(body);
    input.sendKeys(Key.TAB);
  }

  backspace(){
    browser.actions().sendKeys(Key.BACK_SPACE).perform();
  }


  getUniqueTodo(_id:string) {
    let todo = element(by.id(_id)).getText();
    this.highlightElement(by.id(_id));

    return todo;
  }
}

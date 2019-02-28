import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  //This delay is only put here so that you can watch the browser do its' thing.
  //If you're tired of it taking long you can remove this call
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(1);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get and highlight Todo Name attribute ', () => {
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  it('should type something in filter owner box and check that it returned correct element', () => {
    page.navigateTo();
    page.getTodoByOwner("Blanche");
    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche\n" +
      "software design\n" +
      "false\n" +
      "In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.")
  });

  it('should type something in filter status box and check that it returned correct element', () => {
    page.navigateTo();
    page.getTodoByStatus("true");
    expect(page.getUniqueTodo("58895985ae3b752b124e7663")).toEqual("Fry\n" +
      "homework\n" +
      "true\n" +
      "Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.")
  });

  it('should type something in filter body box and check that it returned correct element', () => {
    page.navigateTo();
    page.getTodoByBody("Proident cupidatat exercitation id ullamco magna do qui aliquip id. Eiusmod labore non nostrud culpa duis incididunt incididunt esse occaecat amet officia.");
    expect(page.getUniqueTodo("58895985c32328e015584db2")).toEqual("Workman\n" +
      "homework\n" +
      "false\n" +
      "Proident cupidatat exercitation id ullamco magna do qui aliquip id. Eiusmod labore non nostrud culpa duis incididunt incididunt esse occaecat amet officia.");
  });

  it('should type something in filter id box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAnId("58895985f3b7862d7e2f0079");
    expect(page.getUniqueTodo("58895985f3b7862d7e2f0079")).toEqual("Dawn\n" +
      "video games\n" +
      "true\n" +
      "Cupidatat ex Lorem aute laboris mollit minim minim velit laborum ad culpa consectetur enim ut. Pariatur ad elit in est aliqua.");
    for (let i = 0; i<24; i++) {
      page.backspace();
    }

    page.typeAnId("58895985f866106e90e7c7b2");
    expect(page.getUniqueTodo("58895985f866106e90e7c7b2")).toEqual("Roberta\n" +
      "video games\n" +
      "false\n" +
      "Velit officia commodo do consequat labore ea aliquip officia adipisicing. Nisi dolore nisi non cupidatat ut elit non amet dolor cupidatat.");
  });

});

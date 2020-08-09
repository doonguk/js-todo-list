import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";
import { ALL, ACTIVE, COMPLETED, STORAGE_KEY } from "../../utils/constants.js";
import { storage } from "../../utils/storage.js";

function getTodosByStatus(todos, status) {
  switch (status) {
    case ALL:
      return todos;
    case ACTIVE:
      return todos.filter((todo) => todo.isCompleted === false);
    case COMPLETED:
      return todos.filter((todo) => todo.isCompleted === true);
    default:
      throw new Error("Unhandled Case");
  }
}
function App() {
  if (new.target !== App) {
    return new App();
  }

  this.init = () => {
    const { onFilter } = this;
    this.filterStatus = ALL;

    new TodoInput();
    new TodoCount();
    new TodoList();

    new TodoFilter({
      selector: ".filters",
      onFilter,
    });
  };

  this.onFilter = (status) => {
    this.filterStatus = status;
    this.setState(this.todos);
  };

  this.init();
}

export default new App();

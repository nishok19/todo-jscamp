import CreateTaskModal from "./CreateTaskModal.component";
import EditTodoModal from "./EditTodoModal.component";
import TodoList from "./TodoList.component";

const TodoLists = ({ todos }) => {
  return (
    <div className="">
      {todos.map((todo) => (
        <div className="mt-5" key={todo?._id}>
          <EditTodoModal todo={todo} />
          <CreateTaskModal todo={todo} />
          <TodoList todo={todo} />
        </div>
      ))}
    </div>
  );
};

export default TodoLists;

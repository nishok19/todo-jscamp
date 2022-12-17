import CreateTaskModal from "./CreateTaskModal.component";
import TodoList from "./TodoList.component";

const TodoLists = ({ todos }) => {
  return (
    <div className="">
      {todos.map((todo) => (
        <div className="mt-5" key={todo?._id}>
          <EditOptions todo={todo} />
          <CreateTaskModal todo={todo} />
          <TodoList todo={todo} />
        </div>
      ))}
    </div>
  );
};

const EditOptions = ({ todo }) => (
  <div>
    <div className="dropdown dropdown-left float-right">
      <label tabIndex={0} className="btn">
        :
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow  rounded-box w-52 bg-bglightdark"
      >
        <li className="bg-bglightdark">
          <button>Edit</button>
        </li>
        <li className="bg-bglightdark">
          <button>Delete</button>
        </li>
      </ul>
    </div>
  </div>
);

export default TodoLists;

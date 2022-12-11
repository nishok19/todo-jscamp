import TodoList from "./TodoList.component";

const TodoLists = ({ todos }) => {
  return (
    <div className="">
      {todos.map((todo) => (
        <TodoList todo={todo} key={todo?._id} />
      ))}
    </div>
  );
};

export default TodoLists;

import TaskList from "./TaskList.component";

const TodoList = ({ todo }) => {
  return (
    <div tabIndex={0} className="collapse collapse-plus grid">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{todo?.title}</div>
      <div className="collapse-content">
        {/*  */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <tbody>
              {todo?.tasks.map((task) => (
                <TaskList task={task} key={task?._id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

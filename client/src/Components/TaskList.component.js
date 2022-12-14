import ConfirmDeleteModal from "./ConfirmDeleteModal.component";
import EditTaskModal from "./EditTaskModal.component";

const TaskList = ({ task, todo }) => {
  const newDate = new Date(task?.createdAt);
  const convDate = newDate.toLocaleString();

  return (
    <tr className="hover hover:text-bglightdark hover:bg-bglightdark">
      <TaskLine data={convDate} />
      <TaskLine data={task?.task} />
      <TaskLine data={task?.status} />
      <EditTaskModal task={task} todo={todo} />
      <ConfirmDeleteModal task={task} todo={todo} />
    </tr>
  );
};

const TaskLine = ({ data }) => <td className="bg-bgdark">{data}</td>;

export default TaskList;

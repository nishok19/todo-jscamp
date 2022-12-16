import EditTaskModal from "./EditTaskModal.component";

const TaskList = ({ task }) => {
  const newDate = new Date(task?.createdAt);
  const convDate = newDate.toLocaleString();

  return (
    <tr className="hover hover:text-bglightdark hover:bg-bglightdark">
      <TaskLine data={convDate} />
      <TaskLine data={task?.task} />
      <TaskLine data={task?.status} />
      <td className="bg-bgdark">
        <EditTaskModal data={task} />
      </td>
    </tr>
  );
};

// ////////////////////////
const TaskLine = ({ data }) => <td className="bg-bgdark">{data}</td>;

export default TaskList;

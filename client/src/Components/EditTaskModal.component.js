import { useEffect, useState } from "react";
import { editTask } from "../utils/db";
import useTodoStore from "../store/store";
import Toast from "./Toast.component";

const EditTaskModal = ({ task, todo }) => {
  const [thisTask, setThisTask] = useState("");
  const [status, setStatus] = useState("");
  const modalId = `my-editTaskModal-${task?._id}`;
  const [otherStatus, setOtherStatus] = useState([]);
  const allStatus = ["NOT COMPLETED", "PENDING", "COMPLETED"];
  const [toast, setToast] = useState({
    visible: false,
    msg: "",
  });
  const addTask = useTodoStore((state) => state.addTask);

  const [orgTask, setOrgTask] = useState({
    task: task?.task,
    status: task?.status,
  });

  useEffect(() => {
    setThisTask(task?.task);
    setStatus(task?.status);

    let other = allStatus.filter((s) => status != s);
    setOtherStatus(other);
  }, []);

  const handleEditTask = async () => {
    if (orgTask.task == thisTask && orgTask.status == status) return null;
    const res = await editTask(task._id, todo._id, { task: thisTask, status });
    if (!res.success) {
      console.log("Error editing Task");
      handleToast("Error editing the task!!!");
      return null;
    } else {
      addTask(res.todo);
      handleToast("Task edited successfully...");
    }
    setThisTask("");
  };

  const handleToast = (msg) => {
    setToast({ visible: true, msg });
    setTimeout(() => {
      setToast({ visible: false, msg: "" });
    }, 5000);
  };

  return (
    <td className="bg-bgdark">
      {toast.visible ? <Toast text={toast.msg} /> : null}

      <label htmlFor={modalId} className="btn p-3 rounded-full">
        <img src="./assets/edit-icon.svg" alt="Edit" />
      </label>

      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-4/12 max-w-5xl bg-bgdark">
          <h3 className="font-bold text-[28px]  text-white">
            Edit {orgTask?.task}
          </h3>
          <div className="py-4 ">
            <div className="form-control w-full max-w-full	">
              <label className="label ">
                <span className="label-text  text-white">
                  Enter the Todo name
                </span>
              </label>
              {/* /////// */}
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered bg-bglightdark text-white w-full max-w-full mt-6"
                value={thisTask}
                onChange={(e) => setThisTask(e.target.value)}
              />

              <select
                defaultValue={status}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="select w-full max-w-xs mt-5 bg-bglightdark text-white"
              >
                <option className="text-white" value={allStatus[0]}>
                  {allStatus[0]}
                </option>
                <option className="text-white" value={allStatus[1]}>
                  {allStatus[1]}
                </option>
                <option className="text-white" value={allStatus[2]}>
                  {allStatus[2]}
                </option>
              </select>
              <span className="label-text-alt text-white">
                {orgTask?.status}
              </span>
              {/* /////// */}
              {/* <label className="label">
                <span className="label-text-alt">Alt label</span>
                <span className="label-text-alt">Alt label</span>
              </label> */}
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor={modalId} className="btn">
              Cancel
            </label>
            <label htmlFor={modalId} className="btn" onClick={handleEditTask}>
              Save
            </label>
          </div>
        </div>
      </div>
    </td>
  );
};

export default EditTaskModal;

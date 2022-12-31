import { useState } from "react";
import useTodoStore from "../store/store";
import { deleteTask } from "../utils/db";
import Toast from "./Toast.component";

const ConfirmDeleteModal = ({ task, todo }) => {
  const modalId = `my-confirmDeleteModa-${task._id}`;
  const deleteStoreTask = useTodoStore((state) => state.deleteTask);
  const storeToken = useTodoStore((state) => state.jwt);
  const [toast, setToast] = useState({
    visible: false,
    msg: "",
  });

  const handleDeleteTask = async () => {
    const res = await deleteTask(todo._id, task._id, storeToken);
    if (!res.success) {
      handleToast("Error in deleting the task...");
      return null;
    } else {
      deleteStoreTask(res.todo);
      handleToast("Task is deleted.");
    }
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

      <label htmlFor={modalId} className=" btn p-3 rounded-full">
        <img src="/assets/trash-icon.svg" alt="Delete" />
      </label>

      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-1/2 max-w-xl bg-bgdark text-white">
          <h3 className="font-bold text-lg">
            Are you sure to delete the Task?
          </h3>
          <p className="py-4">
            Deleting the task will delete the data along with it.
          </p>
          <div className="modal-action">
            <label htmlFor={modalId} className="btn">
              No
            </label>
            <label htmlFor={modalId} className="btn" onClick={handleDeleteTask}>
              Yes
            </label>
          </div>
        </div>
      </div>
    </td>
  );
};

export default ConfirmDeleteModal;

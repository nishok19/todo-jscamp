import { useState } from "react";
import { createTask } from "../utils/db";
import useTodoStore from "./store/store";
import Toast from "./Toast.component";

const CreateTaskModal = ({ todo }) => {
  console.log("yyyyyyyyyyyyyyy", todo);

  const [task, setTask] = useState("");
  const storeuser = useTodoStore((state) => state.user);
  const addTask = useTodoStore((state) => state.addTask);
  //   const { storeuser, addTask } = useTodoStore((state) => ({
  //     storeuser: state.user,
  //     addTask: state.addTask,
  //   }));
  const [toast, setToast] = useState({
    visible: false,
    msg: "",
  });

  const handleToast = (msg) => {
    setToast({ visible: true, msg });
    setTimeout(() => {
      setToast({ visible: false, msg: "" });
    }, 5000);
  };

  const handleCreateTask = async () => {
    console.log("creatingggg taskkkk", todo);
    const res = await createTask({
      user: storeuser.$id,
      todoid: todo._id,
      task,
    });
    console.log("user creating task...", res);
    if (!res.success) {
      console.log("Error creating Task");
      handleToast("Error creating the task!!!");
      setTask("");
    }
    addTask(res.todo);
    handleToast("Task created successfully...");
    setTask("");
  };

  return (
    <div className="float-right mx-4">
      {toast.visible ? <Toast text={toast.msg} /> : null}
      <label htmlFor="my-modal-6" className="btn p-3 rounded-full">
        <img src="./assets/plus-icon.svg" alt="" />
      </label>

      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal">
        {/* task modal */}
        <div className="modal-box w-4/12 max-w-5xl bg-bgdark">
          <h3 className="font-bold text-[28px]">
            Create Task in {todo?.title}
            {console.log("waat", todo)}
          </h3>
          <div className="py-4 ">
            <div className="form-control w-full max-w-full	">
              <label className="label ">
                <span className="label-text  text-white">
                  Enter the Task name
                </span>
              </label>
              {/* /////// */}
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered bg-bglightdark w-full max-w-full mt-6"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              {/* /////// */}
              {/* <label className="label">
                <span className="label-text-alt">Alt label</span>
                <span className="label-text-alt">Alt label</span>
              </label> */}
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              Cancel
            </label>
            <label
              htmlFor="my-modal-6"
              className="btn"
              onClick={handleCreateTask}
            >
              Create
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;

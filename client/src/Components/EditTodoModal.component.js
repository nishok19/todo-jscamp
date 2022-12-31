import { useEffect, useState } from "react";
import { deleteTodo, editTodo } from "../utils/db";
import useTodoStore from "../store/store";
import Toast from "./Toast.component";

const EditTodoModal = ({ todo }) => {
  const modalId = `my-editTodoModal-${todo?._id}`;
  const [thisTodo, setThisTodo] = useState(todo?.title);
  const [toast, setToast] = useState({
    visible: false,
    msg: "",
  });
  const addStoreTodo = useTodoStore((state) => state.addTodo);
  const deleteStoreTodo = useTodoStore((state) => state.deleteTodo);
  const storeToken = useTodoStore((state) => state.jwt);

  const handleEditTodo = async () => {
    if (todo.title == thisTodo) return null;
    const res = await editTodo(todo._id, thisTodo, storeToken);
    if (!res.success) {
      handleToast("Error in editing the title of the Todo...");
      return null;
    } else {
      addStoreTodo(res.todo);
      handleToast("Todo title is changed.");
    }
    // setThisTodo("");
  };

  const handleDeleteTodo = async () => {
    const res = await deleteTodo(todo._id, storeToken);
    if (!res.success) {
      handleToast("Error in deleting the Todo...");
      return null;
    } else {
      deleteStoreTodo(res.todo._id);
      handleToast("Todo is deleted.");
    }
  };

  const handleToast = (msg) => {
    setToast({ visible: true, msg });
    setTimeout(() => {
      setToast({ visible: false, msg: "" });
    }, 5000);
  };

  return (
    <div className="float-right">
      {toast.visible ? <Toast text={toast.msg} /> : null}

      <label
        htmlFor={modalId}
        className="btn p-2"
        onClick={() => console.log("eddittttt", todo)}
      >
        <img src="./assets/more-vertical-icon.svg" alt="edit" />
      </label>

      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-4/12 max-w-5xl bg-bgdark">
          <h3 className="font-bold text-[28px]  text-white">Options</h3>
          <div className="py-4 ">
            <div className="form-control w-full max-w-full	">
              <label className="label ">
                <span className="label-text  text-white">
                  Edit the name of the Todo - '{todo?.title}'
                </span>
              </label>
              {/* /////// */}
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered bg-bglightdark text-white w-full max-w-full mt-6"
                value={thisTodo}
                onChange={(e) => setThisTodo(e.target.value)}
              />

              <span className="label-text-alt text-white">
                {/* {orgTask?.status} */}
              </span>

              {/* /////// */}
              <div className="flex justify-between mt-10">
                <div>
                  <h4 className="font-bold text-[22px]">Delete the todo</h4>
                  <span className="label-text-alt text-creamwhite">
                    Deleting the Todo will also delete the tasks in it!!
                  </span>
                </div>
                <button className="btn btn-error" onClick={handleDeleteTodo}>
                  {/* <ConfirmDelete /> */}
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor={modalId} className="btn">
              Cancel
            </label>
            <label htmlFor={modalId} className="btn" onClick={handleEditTodo}>
              Save
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfirmDelete = () => {
  return (
    <div>
      <label htmlFor="my-confirmDeleteModal" className="">
        Delete
      </label>

      <input
        type="checkbox"
        id="my-confirmDeleteModal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p className="py-4">
            Deleting the Todo will delete all the tasks associated with it
          </p>
          <div className="modal-action">
            <label htmlFor="my-confirmDeleteModal" className="btn">
              Cancel
            </label>
            <label htmlFor="my-confirmDeleteModal" className="btn">
              Ok
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditTodoModal;

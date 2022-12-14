import { useState } from "react";
import { createTodo } from "../utils/db";
import useTodoStore from "../store/store";
import Toast from "./Toast.component";

const CreateTodo = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const storeUser = useTodoStore((state) => state.user);
  const storeToken = useTodoStore((state) => state.jwt);
  const [todo, setTodo] = useState("");
  // const [userDetails, setUserDetails] = useState();
  const [toast, setToast] = useState({
    visible: false,
    msg: "",
  });
  const modalId = `my-modal-${todo?._id}`;

  // useEffect(() => {
  // setUserDetails(storeAddTodo);
  // }, []);

  const handleToast = (msg) => {
    setToast({ visible: true, msg });
    setTimeout(() => {
      setToast({ visible: false, msg: "" });
    }, 5000);
  };

  const handleCreateTodo = async () => {
    const todoData = {
      todo,
      user: storeUser._id,
    };

    const isCreated = await createTodo(todoData, storeToken);
    if (!isCreated.success) {
      console.log("Error creating Todo");
      handleToast("Error creating the todo!!!");
      return null;
    } else {
      console.log("todoooooo+ ", isCreated.todo);
      addTodo(isCreated.todo);
      handleToast("Todo created successfully...");
    }
    setTodo("");
  };

  return (
    <div>
      {toast.visible ? <Toast text={toast.msg} /> : null}
      <label htmlFor={modalId} className="btn p-3 rounded-full">
        <img src="./assets/plus-icon.svg" alt="" />
      </label>

      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box w-4/12 max-w-5xl bg-bgdark">
          <h3 className="font-bold text-[28px]">Todo</h3>
          <div className="py-4 ">
            <div className="form-control w-full max-w-full	">
              <label className="label ">
                <span className="label-text  text-white">
                  Enter the Todo name
                </span>
                {/* <span className="label-text-alt text-white">Alt label</span> */}
              </label>
              {/* /////// */}
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered bg-bglightdark w-full max-w-full mt-6"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
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
            <label htmlFor={modalId} className="btn" onClick={handleCreateTodo}>
              Create
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;

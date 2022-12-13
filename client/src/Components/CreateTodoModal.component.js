import { useEffect, useState } from "react";
import { account } from "../utils/appwrite.config";
import { createTodo } from "../utils/db";
import Toast from "./Toast.component";

const CreateTodo = () => {
  const [todo, setTodo] = useState("");
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const getData = account.get();
    getData.then(
      (res) => {
        console.log("userrrrr", res);
        setUserDetails(res);
      },
      (err) => console.log("Error is getting user data", err)
    );
  }, []);

  const handleCreateTodo = async () => {
    const todoData = {
      todo,
      user: userDetails.$id,
    };
    console.log("todoooooo+ ", userDetails);

    const isCreated = await createTodo(todoData);
    if (!isCreated.success) {
      console.log("Error creating Todo");
      return <Toast text="Error in creating the todo" />;
    }
  };

  return (
    <div>
      <label htmlFor="my-modal-5" className="btn p-3 rounded-full">
        <img src="./assets/plus-icon.svg" alt="" />
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box w-4/12 max-w-5xl bg-bgdark">
          <h3 className="font-bold text-[28px]">Tasks</h3>
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
            <label htmlFor="my-modal-5" className="btn">
              Cancel
            </label>
            <label
              htmlFor="my-modal-5"
              className="btn"
              onClick={handleCreateTodo}
            >
              Create
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;

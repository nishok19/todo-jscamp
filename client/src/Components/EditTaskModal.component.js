import React from "react";

const EditTaskModal = ({ data }) => {
  const modalId = `my-modal-${data?._id}`;

  return (
    <div>
      <label htmlFor={modalId} className="btn p-3 rounded-full">
        <img src="./assets/edit-icon.svg" alt="Edit" />
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box w-4/12 max-w-5xl bg-bgdark">
          <h3 className="font-bold text-[28px]  text-white">
            Edit {data?.task}
          </h3>
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
            <label htmlFor={modalId} className="btn">
              Save
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;

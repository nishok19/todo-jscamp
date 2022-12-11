import React from "react";

function SearchTodo() {
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered bg-bgdark input-info w-full max-w-xs"
      />
      {/* /////////////////////////////// */}
      <div className="form-control max-w-s ">
        <select className="select select-bordered bg-bgdark">
          <option disabled>Sort</option>
          <option defaultValue>Date: present to past</option>
          <option>Date: past to present</option>
        </select>
      </div>
    </div>
  );
}

export default SearchTodo;

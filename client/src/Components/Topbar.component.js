import React from "react";
import CreateTodo from "./CreateTodoModal.component";
import SearchTodo from "./SearchTodo.component";

const Topbar = () => {
  return (
    <div className="flex justify-between bg-bglightdark p-[16px] rounded-3xl">
      <CreateTodo />
      <SearchTodo />
    </div>
  );
};

export default Topbar;

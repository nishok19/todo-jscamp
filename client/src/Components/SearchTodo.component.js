import { useEffect, useState } from "react";
import useTodoStore from "../store/store";
import { searchTodo, sortAscTodoList, sortDscTodoList } from "../utils/helper";

function SearchTodo() {
  const storeTodos = useTodoStore((state) => state.todos);
  const sortPref = useTodoStore((state) => state.sortPref);
  const toggleSortPrefStore = useTodoStore((state) => state.toggleSortPref);
  const addAllTodosStore = useTodoStore((state) => state.addAllTodos);
  const [sort, setSort] = useState(sortPref);
  const storeAddSearchedTodos = useTodoStore((state) => state.addSearchedTodos);

  const [searchingText, setSearchingText] = useState("");

  useEffect(() => {
    toggleSortPrefStore();
    const sortedTodos =
      sortPref === "Asc"
        ? sortAscTodoList(storeTodos)
        : sortDscTodoList(storeTodos);
    addAllTodosStore(sortedTodos);
  }, [sort]);

  const searchText = async () => {
    const res = await searchTodo(storeTodos, searchingText);
    console.log("seachh result: ", res);
    if (res.length === 0) return null;
    storeAddSearchedTodos(res);
  };

  return (
    <div className="flex">
      <label className="flex items-center text-xl mr-4">Sort:</label>
      <div className="form-control max-w-s ">
        <select
          className="select select-bordered bg-bgdark"
          defaultValue={sort}
          onChange={(e) => {
            setSort(e.target.value);
            console.log(sortPref);
          }}
        >
          <option disabled>Sort</option>
          <option value="Dsc">Date: Present to Past</option>
          <option value="Asc">Date: Past to Present</option>
        </select>
      </div>

      {/* /////////////////////////////// */}

      <input
        type="text"
        placeholder="Type here"
        className="input bg-bgdark w-full max-w-xs ml-4"
        value={searchingText}
        onChange={(e) => setSearchingText(e.target.value)}
      />
      <button className="btn btn-circle bg-bgdark" onClick={searchText}>
        <img src="./assets/search-icon.svg" alt="search-icon" />
      </button>
    </div>
  );
}

export default SearchTodo;

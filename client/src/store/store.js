import create from "zustand";

const useTodoStore = create((set) => ({
  todos: [],
  user: {},
  jwt: "",
  sortPref: "Asc",
  searchedTodos: {
    isSearched: false,
    searchTodos: [],
  },

  setUser: (user) => {
    set((state) => ({
      user: user.user,
      jwt: user.token,
    }));
  },

  addAllTodos: (allTodos) => {
    console.log("toooodoooos store", allTodos);
    set((state) => ({
      todos: allTodos,
    }));
  },

  addTodo: (todo) => {
    set((state) => ({
      todos: [todo, ...state.todos],
    }));
  },

  deleteTodo: (todoid) => {
    set((state) => ({
      todos: state.todos.filter((t) => t._id !== todoid),
    }));
  },

  deleteTask: (todo) => {
    set((state) => ({
      todos: state.todos.map((t) => {
        if (t._id !== todo._id) return t;
        return todo;
      }),
    }));
  },

  addTask: (todo) => {
    set((state) => ({
      todos: state.todos.map((t) => {
        if (t._id !== todo._id) return t;
        return todo;
      }),
    }));
  },

  clearAll: () => {
    set((state) => ({
      todos: [],
      user: {},
      jwt: {},
    }));
  },

  toggleSortPref: () => {
    set((state) => ({
      sortPref: state.sortPref == "Asc" ? "Dsc" : "Asc",
    }));
  },

  addSearchedTodos: (todos) => {
    set((state) => ({
      searchedTodos: {
        isSearched: true,
        searchTodos: todos,
      },
    }));
  },

  removeSearchedTodos: () => {
    set((state) => ({
      searchedTodos: {
        isSearched: false,
        searchTodos: [],
      },
    }));
  },
}));

export default useTodoStore;

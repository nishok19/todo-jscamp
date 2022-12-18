import create from "zustand";

const useTodoStore = create((set) => ({
  todos: [],
  user: {},

  setUser: (user) => {
    set((state) => ({
      user: user,
    }));
  },

  addAllTodos: (allTodos) => {
    console.log("toooodoooos", allTodos);
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
    }));
  },
}));

export default useTodoStore;

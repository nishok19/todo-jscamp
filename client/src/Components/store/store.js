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

  addTask: (todo) => {
    set((state) => ({
      todos: state.todos.map((t) => {
        console.log("ohhh storeee", todo, t);
        if (t._id != todo._id) return t;
        return todo;
      }),
    }));
  },
}));

export default useTodoStore;

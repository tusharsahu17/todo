import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const {id, title, body} = action.payload;
      state.push({id, title, body});
    },
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const {id, updatedTitle, updatedBody} = action.payload;
      const todoIndex = state.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        state[todoIndex].title = updatedTitle;
        state[todoIndex].body = updatedBody;
      }
    },
  },
});

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions;
export default todoSlice.reducer;

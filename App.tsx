
import React, { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import TodoItem from './src/screens/TodoItem';
import TodoForm from './src/screens/TodoForm';
import { colors } from './src/screens/colors';
import store from './src/feature/store';

const TodoList = () => {
  const todos = useSelector(state => state.todos);

  return (
    <View>
      {todos.length === 0 ? (
        <View style={style.container}>
          <View style={style.borderStyle} />
          <Text style={style.textStyle}>No tasks</Text>
          <View style={style.borderStyle} />
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <TodoItem {...item} />}
        />
      )}
    </View>
  );
};


const App = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, backgroundColor: '#1B1A17' }}>
        <TodoForm />
        <TodoList />
      </View>
    </Provider>
  );
};

export default App;
const style = StyleSheet.create({
  borderStyle: {
    borderColor: colors.orange,
    borderWidth: 2,
  },
  textStyle: {
    fontSize: 30,
    color: colors.white,
  },
  container: {
    alignSelf: 'center',
    marginTop: 50
  },
})
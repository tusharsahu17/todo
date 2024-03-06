import React, {useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {addTodo} from './todoSlice';
import {colors} from './colors';

const TodoForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleAddTodo = () => {
    const id = Date.now();
    dispatch(addTodo({id, title, body}));
    setTitle('');
    setBody('');
  };

  return (
    <View style={{margin: 10, flexDirection: 'row'}}>
      <View style={styles.container}>
        <TextInput
          placeholder="Title..."
          value={title}
          placeholderTextColor={'white'}
          onChangeText={text => setTitle(text)}
          style={styles.inputStyle}
        />
        <TextInput
          placeholder="About..."
          value={body}
          placeholderTextColor={'white'}
          onChangeText={text => setBody(text)}
          style={styles.inputStyle}
        />
      </View>
      <TouchableOpacity onPress={handleAddTodo} style={styles.btnContainer}>
        <Text style={styles.icon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 5,
  },
  btnContainer: {
    flex: 0.4,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    verticalAlign: 'middle',
    textAlignVertical: 'center',
    borderColor: colors.orange,
  },
  inputStyle: {
    paddingLeft: 10,
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    borderColor: colors.orange,
    backgroundColor: colors.lightgrey,
    color: colors.white,
  },
  icon: {
    fontSize: 50,
    marginTop: 15,
    alignSelf: 'center',
    color: colors.orange,
  },
});

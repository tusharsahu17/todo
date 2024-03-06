import React, {useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import {store} from './src/features/store';
import {removeTodo, updateTodo} from './todoSlice';
import {TouchableOpacity} from 'react-native';
import {colors} from './colors';

const TodoItem = ({id, title, body}) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);

  const handleRemoveTodo = () => {
    setModalVisible(true);
  };

  const handleConfirmRemove = () => {
    dispatch(removeTodo(id));
    setModalVisible(false);
  };

  const handleCancelRemove = () => {
    setModalVisible(false);
  };

  const handleToggleOptions = () => {
    setOptionsVisible(!isOptionsVisible);
  };
  const handleEdit = () => {
    setOptionsVisible(false);
    setEditModalVisible(true);
  };
  const handleUpdateTodo = () => {
    setEditModalVisible(false);
    dispatch(
      updateTodo({id, updatedTitle: editedTitle, updatedBody: editedBody}),
    );
  };
  const handleInfo = () => {
    Alert.alert('Todo Info', `Title: ${title}\n\nBody: ${body}`);
  };
  return (
    <View
      style={{
        margin: 10,
      }}>
      <TouchableOpacity onPress={handleToggleOptions}>
        <View style={styles.container}>
          <View style={{flex: 1, padding: 10}}>
            <Text style={[styles.textStyle, {fontSize: 20}]}>{title}</Text>
            <Text style={styles.textStyle}>{body}</Text>
          </View>
          <TouchableOpacity
            onPress={handleRemoveTodo}
            style={styles.btnContainer}>
            <Text style={styles.icon}>x</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {isOptionsVisible && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 5,
          }}>
          <TouchableOpacity
            onPress={handleInfo}
            style={[styles.btnContainer, {flex: 0.12}]}>
            <Text style={[styles.icon]}>i</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleEdit}
            style={[styles.btnContainer, {flex: 0.12}]}>
            <Text style={[styles.icon, styles.iconstyle]}>i</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={handleCancelRemove}>
        <View style={{flex: 1, justifyContent: 'flex-end', margin: 20}}>
          <View
            style={{
              width: '100%',
              backgroundColor: colors.lightgrey,
              padding: 20,
              borderRadius: 10,
              elevation: 5,
            }}>
            <TextInput
              placeholder="Edit Title"
              value={editedTitle}
              placeholderTextColor="white"
              multiline={true}
              numberOfLines={4}
              onChangeText={text => setEditedTitle(text)}
              style={styles.inputStyle}
            />
            <TextInput
              placeholder="Edit Body"
              value={editedBody}
              placeholderTextColor={'white'}
              onChangeText={text => setEditedBody(text)}
              style={[styles.inputStyle, {height: 300, textAlign: 'auto'}]}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={styles.updateBtn}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUpdateTodo}
                style={styles.updateBtn}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
            </View>
            {/* <Button title="Update Todo" onPress={handleUpdateTodo} /> */}
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCancelRemove}>
        <View style={styles.centeredView}>
          <View style={styles.modalContainer}>
            <Text style={[styles.textStyle, {fontSize: 20}]}>
              Delete this task?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={handleConfirmRemove}
                style={styles.options}>
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancelRemove}
                style={styles.options}>
                <Text style={styles.textStyle}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  textStyle: {
    color: colors.white,
  },
  container: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightgrey,
  },
  btnContainer: {
    flex: 0.14,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.orange,
    justifyContent: 'center',
    marginRight: 5,
  },
  iconstyle: {
    transform: [{rotate: '50deg'}],
  },
  icon: {
    fontSize: 21,
    color: colors.orange,
    alignSelf: 'center',
  },
  modalContainer: {
    padding: 20,
    borderRadius: 5,
    elevation: 5,
    width: '80%',
    alignItems: 'center',
    backgroundColor: colors.lightgrey,
    borderTopWidth: 5,
    borderColor: colors.orange,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    width: 70,
    borderRadius: 2,
    height: 30,
    margin: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.orange,
    backgroundColor: colors.lightgrey,
  },
  inputStyle: {
    height: 40,
    paddingLeft: 10,
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    borderColor: colors.orange,
    backgroundColor: colors.lightgrey,
    color: colors.white,
  },
  updateBtn: {
    borderWidth: 1,
    width: 100,
    borderRadius: 5,
    paddingVertical: 5,
    borderColor: colors.orange,
    alignItems: 'center',
  },
});

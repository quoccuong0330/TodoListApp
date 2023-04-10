import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import Colors from "../../Global/Colors";

export default function TodoModal({ closeModal, itemModal, updateList }) {
  const [item, setItem] = useState(itemModal);
  const [name, setName] = useState(item.name);
  const [newTodo, setNewTodo] = useState("");
  const completedCount = item.todos.filter((todo) => todo.completed).length;
  const taskCount = item.todos.length;
  // const completedCount = 1;
  // const taskCount = 1;

  toggleCompletedTask = (index) => {
    item.todos[index].completed = !item.todos[index].completed;
    updateList(item);
  };

  renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => toggleCompletedTask(index)}>
          <Ionicons
            name={todo.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color={Colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? "line-through" : "none",
              color: todo.completed ? Colors.gray : Colors.black,
            },
          ]}
        >
          {todo.title}
        </Text>
      </View>
    );
  };

  addTodo = () => {
    let list = { title: newTodo, completed: false };
    item.todos.push(list);
    updateList(item);

    setNewTodo("");
    Keyboard.dismiss();
  };
  return (
    <KeyboardAvoidingView flex={1} behavior="padding">
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
        >
          <AntDesign
            name="close"
            size={24}
            color={Colors.black}
            onPress={closeModal}
          />
        </TouchableOpacity>

        <View
          style={[
            styles.section,
            styles.header,
            { borderBottomColor: item.color },
          ]}
        >
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>

        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            data={item.todos}
            keyExtractor={(item) => item.title}
            renderItem={({ item, index }) => this.renderTodo(item, index)}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, { borderColor: item.color }]}
            onChangeText={(text) => setNewTodo(text)}
            value={newTodo}
          />
          <TouchableOpacity
            style={[styles.addTodo, { backgroundColor: item.color }]}
            onPress={() => this.addTodo()}
          >
            <AntDesign name="plus" size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignItems: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    width: "85%",
    borderBottomWidth: 3,
  },
  title: {
    fontWeight: "800",
    fontSize: 30,
    color: Colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: Colors.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 6,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "600",
  },
});

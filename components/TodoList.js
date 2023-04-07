import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

import Colors from "../Global/Colors";
import TodoModal from "./Modal/TodoModal";

export default function TodoList({ toDoList }) {
  const [listItem, setListItem] = useState(toDoList);
  const [isOpenList, setIsOpenList] = useState(false);
  const completedCount = listItem.todos.filter((todo) => todo.completed).length;
  const remainingCount = listItem.todos.length - completedCount;
  // const completedCount = 1;
  // const remainingCount = 1;

  toggleList = () => {
    setIsOpenList(!isOpenList);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        onRequestClose={() => this.toggleList()}
        visible={isOpenList}
      >
        <TodoModal listItem={listItem} closeModal={() => this.toggleList()} updateList={updateList}/>
      </Modal>
      <TouchableOpacity
        style={[styles.container, { backgroundColor: listItem.color }]}
        onPress={() => this.toggleList()}
      >
        <Text style={styles.title} numberOfLines={1}>
          {listItem.name}
        </Text>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.count}>{remainingCount}</Text>
          <Text style={styles.subtitle}>Remaining</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.count}>{completedCount}</Text>
          <Text style={styles.subtitle}>Completed</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  title: {
    fontWeight: "700",
    color: Colors.white,
    fontSize: 24,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: Colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.white,
  },
});

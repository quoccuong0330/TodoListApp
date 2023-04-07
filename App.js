import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";

import data from "./Data";
import TodoList from "./components/TodoList";
import colors from "./Global/Colors";
import AddListModal from "./components/Modal/AddListModal";

function App() {
  let [dataList, setDataList] = useState(data);
  let [isOpenModal, setIsOpenModal] = useState(false);

  toggleIsOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  addList = (list) => {
    setDataList((dataList) => [...dataList, { ...list }]);
  };

  updateList = (list) => {
    // setDataList((dataList) => [...dataList, { ...list }]);
    setDataList(
      dataList.map((data) => {
        return data.id === list.id ? list : data;
      })
    );
  };

  renderTodoList = (list) => {
    return <TodoList toDoList={list} updateList={this.updateList} />;
  };
  return (
    <View style={styles.container}>
      <Modal
        visible={isOpenModal}
        animationType="slide"
        onRequestClose={() => this.toggleIsOpenModal()}
      >
        <AddListModal
          closeModal={() => this.toggleIsOpenModal()}
          addList={addList}
        />
      </Modal>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo{" "}
          <Text style={{ fontWeight: "300", color: colors.blue }}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>

      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() => this.toggleIsOpenModal()}
        >
          <AntDesign name="plus" color={colors.blue} size={16} />
        </TouchableOpacity>
        <Text style={styles.add}>Add list</Text>
      </View>

      <View style={{ height: 275, paddingLeft: 32 }}>
        <FlatList
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={dataList}
          renderItem={({ item }) => this.renderTodoList(item)}
          keyboardShouldPersistTaps = 'always'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "600",
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    marginTop: 8,
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default App;

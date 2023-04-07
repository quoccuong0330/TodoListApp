import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import data from "../../Data";
import Colors from "../../Global/Colors";

export default function AddListModal({ closeModal, addList }) {
  let backgroundColors = [
    "#5cd859",
    "#24a6d9",
    "#595bd9",
    "#8022d9",
    "#d159d8",
    "#d85963",
    "#d88559",
  ];
  let [name, setName] = useState("");
  let [colorCreate, setColorCreate] = useState(backgroundColors[0]);

  renderColor = () => {
    return backgroundColors.map((color, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => setColorCreate(color)}
        />
      );
    });
  };

  createTodo = () => {
    const list = {
      name,
      color: colorCreate,
      todos: [],
      id: Math.floor(Math.random() * 100),
    };
    console.log("addList", list);
    addList(list);
    setName("");
    closeModal();
  };

  handleOnChangeInput = (text, id) => {
    id(text);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={{ position: "absolute", top: 64, right: 32 }}>
        <AntDesign
          name="close"
          size={24}
          color={Colors.black}
          onPress={closeModal}
        />
      </TouchableOpacity>

      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>Create Todo List</Text>

        <TextInput
          style={styles.input}
          placeholder="List name"
          onChangeText={(text) => setName(text)}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          {this.renderColor()}
        </View>

        <TouchableOpacity
          style={[styles.create, { backgroundColor: colorCreate }]}
          onPress={() => this.createTodo()}
        >
          <Text style={{ color: Colors.white, fontWeight: "600" }}>Create</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    alignSelf: "center",
    marginBottom: 16,
    color: Colors.black,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue,
    borderRadius: 6,
    height: 50,
    paddingHorizontal: 16,
    marginTop: 8,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { AntDesign } from "@expo/vector-icons";

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const post = state.find((post) => post.id === navigation.getParam("id"));

  useEffect(() => {
    navigation.setParams({ title: post.title });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.blogPost}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.content}>{post.content}</Text>
      </View>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Edit", { id: navigation.getParam("id") })
        }
      >
        <AntDesign
          style={styles.headerRight}
          name="edit"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    ),
    title: navigation.getParam("title"),
  };
};

export default ShowScreen;

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 20,
  },
  container: {
    padding: 20,
    flex: 1,
  },
  blogPost: {
    padding: 20,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  content: {
    lineHeight: 25
  }
});

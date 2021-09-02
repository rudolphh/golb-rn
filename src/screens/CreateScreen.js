import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Context as BlogContext } from "../context/BlogContext";

const CreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { state, addBlogPost, editBlogPost } = useContext(BlogContext);
  const id = navigation.getParam("id");

  useEffect(() => {
    if (id) {
      const post = state.find((post) => post.id === navigation.getParam("id"));
      setTitle(post.title);
      setContent(post.content);
      navigation.setParams({ title: 'Edit Blog Post'})
    } else {
        navigation.setParams({ title: 'Create New Blog Post'})
    }
  }, []);

  return (
    <View style={styles.formView}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.inputText}
        value={title}
        onChangeText={(title) => setTitle(title)}
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        multiline={true}
        textAlignVertical="top"
        style={[styles.inputText, styles.content]}
        value={content}
        onChangeText={(content) => setContent(content)}
      />
      <Button
        title={ id ? "Save Blog Post" : "Create Blog Post" }
        onPress={() => {
          if (id) {
            // editBlogPost
            editBlogPost(id, title, content, () => {
                navigation.navigate("Index");
            })
          } else
            addBlogPost(title, content, () => {
              navigation.navigate("Index");
            });
        }}
      />
    </View>
  );
};

CreateScreen.navigationOptions = ({ navigation }) => {
    return { 
        title: navigation.getParam("title")
    }
};

export default CreateScreen;

const styles = StyleSheet.create({
  formView: {
    padding: 20,
    flex: 1,
  },
  label: {
    marginBottom: 5,
  },
  inputText: {
    borderWidth: 1,
    borderColor: "lightgray",
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
});

import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(BlogContext);

  useEffect(() => {
    navigation.setParams({ title: 'Create New Blog Post'})
  }, []);

  return <BlogPostForm onSubmit={(title, content) => {
    addBlogPost(title, content, () => {
        navigation.navigate("Index");
    })
  }} />;
};

CreateScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("title"),
  };
};

export default CreateScreen;

const styles = StyleSheet.create({});

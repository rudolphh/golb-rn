import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const EditScreen = ({ navigation }) => {
  const { state, editBlogPost } = useContext(Context);
  const blogPost = state.find((post) => post.id === navigation.getParam("id"));

  useEffect(() => {
    navigation.setParams({ title: 'Edit Blog Post'})
  }, []);

  return (
    <BlogPostForm
      onSubmit={(title, content) => {
        editBlogPost(blogPost.id, title, content, () => {
          navigation.pop();
        });
      }}
      initialValues={{ title: blogPost.title, content: blogPost.content }}
    />
  );
};

EditScreen.navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title"),
    };
  };

export default EditScreen;

const styles = StyleSheet.create({});

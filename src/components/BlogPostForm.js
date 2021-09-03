import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const BlogPostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

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
        title="Save Blog Post"
        onPress={() => onSubmit(title, content)}
      />
    </View>
  );
};

BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
}

export default BlogPostForm;

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

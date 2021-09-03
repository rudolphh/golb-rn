import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { AntDesign } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  const { state, getBlogPosts, deleteBlogPost } = useContext(Context);

  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    })

    // cleanup
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View>
        { state.length === 0 ? <Text style={styles.empty}>No Blog Posts</Text> :
      <FlatList
        style={styles.list}
        data={state}
        keyExtractor={(post) => post.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.blogButton}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    deleteBlogPost(item.id);
                  }}
                >
                  <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    }
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <AntDesign
          style={styles.headerRight}
          name="plus"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    ),
  };
};

export default IndexScreen;

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 20,
  },
  empty: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15
  },
  list: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  title: {
    fontSize: 18,
    width: '81%'
  },
  blogButton: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
});

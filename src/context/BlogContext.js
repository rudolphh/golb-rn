import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";
import uuid from "react-native-uuid";

const reducer = (state, action) => {
  switch (action.type) {
    case "get_posts":
      return action.payload;
    case "add_post":
      return [...state, action.payload];

    case "edit_post":
      return state.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );

    case "delete_post":
      return state.filter((post) => post.id !== action.payload);

    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    try {
      const response = await jsonServer.get("/blogposts");
      dispatch({ type: "get_posts", payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    try {
      const response = await jsonServer.post("/blogposts", {
        id: uuid.v4(), title, content
      });
      console.log(response.data);
      dispatch({ type: "add_post", payload: response.data });
      if (callback) callback();
    } catch (err) { console.log(err); }
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    try {
      const response = await jsonServer.put(`/blogposts/${id}`, {
        id, title, content
      })
      console.log(response.data);
      dispatch({ type: "edit_post", payload: response.data });
      if (callback) callback();
    } catch (err) {
      console.log(err);
    }
  };
};


const deleteBlogPost = (dispatch) => {
  return async (id) => {
    try {
      const response = await jsonServer.delete(`/blogposts/${id}`)
      dispatch({ type: "delete_post", payload: id });
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { getBlogPosts, addBlogPost, editBlogPost, deleteBlogPost },
  []
);

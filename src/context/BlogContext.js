import createDataContext from "./createDataContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "add_post":
      return [
        ...state,
        { id: Math.floor(Math.random() * 99999), ...action.payload },
      ];

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

const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    // use async (title, content, callback) => {}
    // try {
    // await axios.post('somepath', title, content)
    dispatch({ type: "add_post", payload: { title, content } });
    callback();
    // } catch (err)
  };
};

const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({ type: "edit_post", payload: { id, title, content } });
    callback();
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: "delete_post", payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { addBlogPost, editBlogPost, deleteBlogPost },
  [
    {
      id: 1,
      title: "Jesus",
      content: "I trust in You",
    },
  ]
);

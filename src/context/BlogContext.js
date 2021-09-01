import React, { useState, useReducer } from "react";
import createDataContext from "./createDataContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "add_post":
      return [...state, { title: `Blog Post #${state.length + 1}` }];

    default:
      return state;
  }
};

const addBlogPost = () => {
  dispatch({ type: "add_post" });
};

export const { BlogContext, BlogProvider } = createDataContext(
  reducer,
  { addBlogPost },
  []
);

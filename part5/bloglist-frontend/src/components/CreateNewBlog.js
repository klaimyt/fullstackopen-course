import React from "react";

const CreateNewBlog = ({handleNewBlog}) => {
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input type="text" name="title" />
        </div>
        <div>
          author:
          <input type="text" name="author" />
        </div>
        <div>
          url:
          <input type="text" name="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};
export default CreateNewBlog;

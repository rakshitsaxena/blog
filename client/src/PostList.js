import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://posts.com/posts");
    //axios sends data in data prop
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []); //empty array will make this run one time

  //console.log(posts);

  const renderedPosts = Object.values(posts).map((post) => {
    //key because we have a list of elements and react will expect
    //key.
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className='card-body'>
            <h3>{post.title}</h3>
            <CommentList comments={post.comments}/>
            <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });
  //This will give array of objects
  return <div className="d-flex flex-row flex-wrap justify-content-between">
    {renderedPosts}
    </div>;
};

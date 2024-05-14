// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios
      .get('/api/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddPost = () => {
    axios
      .post('/api/posts', { title, content })
      .then((response) => {
        console.log('response::', response);
        setPosts([...posts, response.data]);
        setTitle('');
        setContent('');
      })
      .catch((error) => console.log(error));
  };

  const handleDeletePost = (id) => {
    axios
      .delete(`/api/posts/${id}`)
      .then(() => {
        setPosts(posts.filter((post) => post._id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => handleDeletePost(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="container">
        <h2>Add New Post</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        ></textarea>
        <button onClick={handleAddPost}>Add Post</button>
      </div>
    </div>
  );
}

export default App;

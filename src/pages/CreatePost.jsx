import React, { useState } from 'react';
import { supabase } from '../client';

const CreatePost = () => {  
  const [newPost, setNewPost] = useState({
    title: "",
    author: "",
    content: "",
    likeCount: 0,
    commentCount: 0,
    image_url: ""
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const createPost = async (event) => {
    event.preventDefault();

    if (!newPost.title || !newPost.author || !newPost.content) {
      alert('Please fill in all fields.');
      return;
    }

    let imageUrl = "";
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error } = await supabase
        .storage
        .from('hangar-talk-images')
        .upload(fileName, imageFile);

      if (error) {
        alert('Image upload failed!');
        return;
      }


      const { data } = supabase
        .storage
        .from('hangar-talk-images')
        .getPublicUrl(fileName);
      imageUrl = data.publicUrl;
    }

    await supabase
      .from('Posts')
      .insert([{ ...newPost, image_url: imageUrl }]);


    window.location = "/posts";
  };

  return (
    <div className="create-post-page">
      <h2>Create Post</h2>
      <form onSubmit={createPost} className="create-post-form">
        <input type="text" name="title" placeholder="Title" value={newPost.title} onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" value={newPost.author} onChange={handleChange} required />
        <textarea name="content" placeholder="Content" value={newPost.content} onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" className="create-post-button">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
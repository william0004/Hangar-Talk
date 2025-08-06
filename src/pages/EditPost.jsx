import {Link, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client';

const EditPost = () => {
  const [post, setPost] = useState({id: null, title: '', author: '', content: '', likeCount: 0, image_url: ''});
  const {id} = useParams();
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const fetchPost = async () => {
    const {data} = await supabase
      .from('Posts')
      .select()
      .eq('id', id)
      .single();

    setPost(data);
  }

  const updatePost = async (event) => {
    event.preventDefault();

    let imageUrl = post.image_url; // 保持原图
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
      .update({
        title: post.title,
        author: post.author,
        content: post.content,
        image_url: imageUrl
      })
      .eq('id', id);

    window.location = `/posts/${id}`;
  };

  const deletePost = async (event) => {
    event.preventDefault();
    await supabase
      .from('Posts')
      .delete()
      .eq('id', id);
    window.location = '/posts';
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setPost( (prev) => {
        return {
            ...prev,
            [name]:value,
        }
    })
  }

  useEffect(()=>{
    fetchPost();
  }, []);

  return (
    <div className="edit-post-page">
      <h2>Edit Post Page</h2>
      <p>This is where you can edit an existing post.</p>
      <form onSubmit={updatePost} className="edit-post-form">
        <input type="text" name="title" value={post.title} onChange={handleChange} />
        <input type="text" name="author" value={post.author} onChange={handleChange} />
        <textarea name="content" value={post.content} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" className="edit-post-button">Update Post</button>
      </form>
      <button onClick={deletePost} className="delete-post-button">Delete Post</button>
    </div>
  );
}

export default EditPost;
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, fetchPostById, fetchCommentsByPostId, createPost, updatePost, selectItems, selectItem, selectComments, selectStatus, selectError } from './redux/features/counterSlice'
const App = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectItems)
  const item = useSelector(selectItem)
  const comments = useSelector(selectComments)
  const status = useSelector(selectStatus)
  const error = useSelector(selectError)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleCreatePost = () => {
    const newPost = { title: 'New Post', body: 'This is a new post.' }
    dispatch(createPost(newPost))
  }

  const handleUpdatePost = (id) => {
    const updatedPost = { title: 'Updated Post', body: 'This is an updated post.' }
    dispatch(updatePost({ id, updatedPost }))
  }

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>{error}</p>

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={handleCreatePost}>Create Post</button>
      <ul>
        {items.map(post => (
          <li key={post.id}>
            <span>{post.title}</span>
            <button onClick={() => dispatch(fetchPostById(post.id))}>View Post</button>
            <button onClick={() => handleUpdatePost(post.id)}>Update Post</button>
          </li>
        ))}
      </ul>

      {item && (
        <div>
          <h2>Post Details</h2>
          <p>{item.title}</p>
          <p>{item.body}</p>
          <button onClick={() => dispatch(fetchCommentsByPostId(item.id))}>View Comments</button>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>{comment.body}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App

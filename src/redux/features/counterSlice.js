
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'

const initialState = {
    items: [],
    item: null,
    comments: [],
    status: 'idle',
    error: null,
}


export const fetchPosts = createAsyncThunk('items/fetchPosts', async () => {
    const response = await api.get('/posts')
    return response.data
})

export const fetchPostById = createAsyncThunk('items/fetchPostById', async (postId) => {
    const response = await api.get(`/posts/${postId}`)
    return response.data
})

export const fetchCommentsByPostId = createAsyncThunk('items/fetchCommentsByPostId', async (postId) => {
    const response = await api.get(`/posts/${postId}/comments`)
    return response.data
})

export const createPost = createAsyncThunk('items/createPost', async (newPost) => {
    const response = await api.post('/posts', newPost)
    return response.data
})

export const updatePost = createAsyncThunk('items/updatePost', async ({ id, updatedPost }) => {
    const response = await api.put(`/posts/${id}`, updatedPost)
    return response.data
})

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.item = action.payload
            })
            .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
                state.comments = action.payload
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const { id } = action.payload
                const existingPost = state.items.find((item) => item.id === id)
                if (existingPost) {
                    Object.assign(existingPost, action.payload)
                }
            })
    },
})

export const selectItems = (state) => state.items.items
export const selectItem = (state) => state.items.item
export const selectComments = (state) => state.items.comments
export const selectStatus = (state) => state.items.status
export const selectError = (state) => state.items.error

export default itemSlice.reducer


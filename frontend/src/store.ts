import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './Redux/Reducers/CustomerReducer';
import AdminReducer from './Redux/Reducers/AdminReducer';

export const store = configureStore({
  reducer: { 
   UserState:UserReducer,
   AdminState:AdminReducer,
},
  devTools:true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
import { configureStore } from '@reduxjs/toolkit'
import draftsReducer from './draftsSlice'

export const store = configureStore({
  reducer: {
    drafts: draftsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

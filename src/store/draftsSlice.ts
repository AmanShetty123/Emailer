import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit'
import { loadDrafts, saveDrafts } from '../storage/draftsStorage'
import { RootState, AppDispatch } from './store'
export interface Draft {
  id: string
  recipient: string
  subject: string
  body: string
  sent: boolean
}

interface DraftsState {
  drafts: Draft[]
}

const initialState: DraftsState = {
  drafts: [],
}

const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    addDraft: (state, action: PayloadAction<Draft>) => {
      state.drafts.push(action.payload)
      saveDrafts(state.drafts);
    },
    updateDraft: (state, action: PayloadAction<Draft>) => {
      const index = state.drafts.findIndex(d => d.id === action.payload.id)
      if (index !== -1) {
        state.drafts[index] = action.payload
        saveDrafts(state.drafts)
      }
    },
    markAsSent: (state, action: PayloadAction<string>) => {
      const draft = state.drafts.find(d => d.id === action.payload)
      if (draft) {
        draft.sent = true
        saveDrafts(state.drafts)
      }
    },
    setDrafts: (state, action: PayloadAction<Draft[]>) => {
      state.drafts = action.payload
    },
  },
})

export const { addDraft, updateDraft, markAsSent, setDrafts } = draftsSlice.actions
export const fetchDrafts = () => async (dispatch: AppDispatch) => {
  const drafts = await loadDrafts()
  dispatch(setDrafts(drafts))
}
export default draftsSlice.reducer

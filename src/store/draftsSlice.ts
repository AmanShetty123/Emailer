import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit'
import { loadDrafts, saveDrafts } from '../storage/draftsStorage'
import { RootState, AppDispatch } from './store'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DraftService } from '../services/draftService';
import uuid from 'react-native-uuid'
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

export const addDrafts = (recipient: string, subject: string, body: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const newDraft = {
      id: uuid.v4().toString(),
      recipient,
      subject,
      body,
      sent: false
    };

    // Add to mock API
    const addedDraft = await DraftService.addDraft(newDraft);
    
    // Dispatch to Redux store
    dispatch(draftsSlice.actions.addDraft(addedDraft));
  } catch (error) {
    console.error('Failed to add draft', error);
  }
};
export const updateDrafts = (id: string ,recipient: string, subject: string, body: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const updatedDraft = {
      id,
      recipient,
      subject,
      body,
      sent: false
    };

    // Add to mock API
    const addedDraft = await DraftService.updateDraft(updatedDraft);
    
    // Dispatch to Redux store
    dispatch(draftsSlice.actions.updateDraft(updatedDraft));
  } catch (error) {
    console.error('Failed to add draft', error);
  }
};

export const sendDraft = (
  recipient: string, 
  subject: string, 
  body: string, 
  draftId?: string
) => async (dispatch: AppDispatch) => {
  try {
    const draftData = {
      id: draftId || uuid.v4().toString(),
      recipient,
      subject,
      body,
      sent: true
    };

    if (draftId) {
      // Update existing draft
      const updatedDraft = await DraftService.updateDraft(draftData);
      dispatch(updateDraft(updatedDraft));
     } 
    else {
      // Add new sent draft
      const addedDraft = await DraftService.addDraft(draftData);
      dispatch(addDraft(addedDraft));
    }
  } catch (error) {
    console.error('Failed to send draft', error);
  }
};

export const sentEmail = (
  recipient: string, 
  subject: string, 
  body: string, 
  draftId?: string
) => async (dispatch: AppDispatch) => {
  try {
    const draftData = {
      id: uuid.v4().toString(),
      recipient,
      subject,
      body,
      sent: true
    };

      const updatedDraft = await DraftService.addDraft(draftData);
      dispatch(addDraft(updatedDraft));
  } catch (error) {
    console.error('Failed to send draft', error);
  }
};

export const { addDraft, updateDraft, markAsSent, setDrafts } = draftsSlice.actions
export const fetchDrafts = () => async (dispatch: AppDispatch) => {
  try {
    const drafts = await DraftService.fetchDrafts();
    dispatch(setDrafts(drafts));  
  } catch (error) {
    console.error('Failed to fetch drafts', error);
  }
};
export const clearAllDrafts = () => async (dispatch: AppDispatch) => {
  await AsyncStorage.removeItem('drafts');
  dispatch(setDrafts([]));
};
export default draftsSlice.reducer

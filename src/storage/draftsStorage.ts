import AsyncStorage from '@react-native-async-storage/async-storage'
import { Draft } from '../store/draftsSlice'

const STORAGE_KEY = 'drafts'

export const saveDrafts = async (drafts: Draft[]) => {
  try {
    const jsonValue = JSON.stringify(drafts)
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
  } catch (e) {
    console.error('Failed to save drafts', e)
  }
}

export const loadDrafts = async (): Promise<Draft[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
    return jsonValue ? JSON.parse(jsonValue) : []
  } catch (e) {
    console.error('Failed to load drafts', e)
    return []
  }
}

export const removeDrafts = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.error('Failed to remove drafts', e)
  }
}

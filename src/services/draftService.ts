import axios from "axios";
import { Draft } from "../store/draftsSlice";

const BASE_URL = "http://your_local_api_address/drafts";

export const DraftService = {
  async fetchDrafts() {
    const response = await axios.get(BASE_URL);
    return response.data;
  },
  async addDraft(draft: Draft) {
    const response = await axios.post(BASE_URL, draft);
    return response.data;
  },

  async updateDraft(draft: Draft) {
    const response = await axios.put(`${BASE_URL}/${draft.id}`, draft);
    return response.data;
  },

  async deleteDraft(id: string) {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};

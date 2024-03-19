import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISaveQuestionAnsweredReq } from "./detail-question.model";
import { _saveQuestionAnswer } from "../../data/_DATA";

const initialState = {};

export const postQuestionAnswared = createAsyncThunk(
  "post-question-answared",
  async (params: ISaveQuestionAnsweredReq) => {
    await _saveQuestionAnswer(params);
  }
);

const detailQuestionSlice = createSlice({
  name: "detail-question-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postQuestionAnswared.fulfilled, () => {});
  },
});

export default detailQuestionSlice.reducer;

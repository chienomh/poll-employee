import { createAsyncThunk } from "@reduxjs/toolkit";
import { _saveQuestion } from "../../data/_DATA";
import { ISaveQuestionReq } from "../../components/list-questions/list-question.model";

export const postAddQuestion = createAsyncThunk(
  "post-add-question",
  async (param: ISaveQuestionReq) => {
    await _saveQuestion(param);
  }
);

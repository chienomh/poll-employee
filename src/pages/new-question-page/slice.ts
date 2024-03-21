import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _saveQuestion } from "../../data/_DATA";
import {
  IQuestion,
  ISaveQuestionReq,
} from "../../components/list-questions/list-question.model";
import { RootState } from "../../store";

export const postAddQuestion = createAsyncThunk<IQuestion, ISaveQuestionReq>(
  "post-add-question",
  async (param: ISaveQuestionReq) => {
    return await _saveQuestion(param);
  }
);

type IInitial = {
  newQuestionId?: string;
};

const initialState: IInitial = {
  newQuestionId: undefined,
};

export const getNewQuestionId = (state: RootState) =>
  state.newQuestion.newQuestionId;

const newQuestionSlice = createSlice({
  name: "create-new-question",
  initialState,
  reducers: {
    setNewQuestionId: (
      state: IInitial,
      action: PayloadAction<string | undefined>
    ) => {
      state.newQuestionId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      postAddQuestion.fulfilled,
      (state: IInitial, action: PayloadAction<IQuestion>) => {
        state.newQuestionId = action.payload.id;
      }
    );
  },
});

export const { setNewQuestionId } = newQuestionSlice.actions;

export default newQuestionSlice.reducer;

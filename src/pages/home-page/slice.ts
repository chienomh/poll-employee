import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IHomeState } from "./home.model";
import { IQuestions } from "../../components/list-questions/list-question.model";
import { _getQuestions } from "../../data/_DATA";

const initialState: IHomeState = {
  isLoading: "",
  listQuestion: undefined,
};

export const fetchAllQuesttion = createAsyncThunk(
  "fetch-all-question",
  async () => {
    const res: IQuestions = await _getQuestions();
    return res;
  }
);

const homeSlicer = createSlice({
  name: "home-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllQuesttion.fulfilled,
      (state: IHomeState, action: PayloadAction<IQuestions>) => {
        state.listQuestion = action.payload;
      }
    );
  },
});

// export const { getAllQuestion } = homeSlicer.actions;
export default homeSlicer.reducer;

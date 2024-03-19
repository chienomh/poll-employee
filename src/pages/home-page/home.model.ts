import { IQuestions } from "../../components/list-questions/list-question.model";

export interface IHomeState {
  listQuestion?: IQuestions;
  isLoading: string;
}

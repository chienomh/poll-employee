export interface ISaveQuestionAnsweredReq {
  authedUser?: string | number;
  qid: string;
  answer: string;
}

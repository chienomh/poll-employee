export interface IListQuestion {
  title: string;
  questions?: IQuestions;
}

export interface IQuestion {
  id: string;
  author: string;
  timestamp: number;
  optionOne: {
    votes: string[];
    text: string;
  };
  optionTwo: {
    votes: string[];
    text: string;
  };
}

export interface IQuestions {
  [questtionId: string]: IQuestion;
}

export interface ISaveQuestionReq {
  optionOneText: string;
  optionTwoText: string;
  author?: string;
}

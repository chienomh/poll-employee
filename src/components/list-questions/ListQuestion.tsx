import { useEffect, useState } from "react";
import { IListQuestion, IQuestion } from "./list-question.model";
import "./list-question.scss";
import Question from "../question/Question";

export default function ListQuestion({ questions, title }: IListQuestion) {
  const [listQuestion, setListQuestion] = useState<IQuestion[]>([]);
  useEffect(() => {
    let newList: IQuestion[] = [];
    for (const key in questions) {
      newList.push(questions[key]);
    }
    setListQuestion(newList.sort((a, b) => b.timestamp - a.timestamp));
  }, [questions]);
  return (
    <div className="wrapper-list">
      <div className="title">{title}</div>
      <div className="content">
        {listQuestion.map((item: IQuestion) => (
          <Question
            author={item.author}
            id={item.id}
            optionOne={item.optionOne}
            optionTwo={item.optionTwo}
            timestamp={item.timestamp}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}

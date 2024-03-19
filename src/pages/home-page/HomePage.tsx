import { useEffect, useMemo } from "react";
import ListQuestion from "../../components/list-questions/ListQuestion";
import { IQuestions } from "../../components/list-questions/list-question.model";
import { useAppDispatch, useAppSelector } from "../../store";
import { getCurrentUser } from "../login-page/selector";
import { fetchAllUsers } from "../login-page/slice";
import "./home.scss";
import { getAllQuestion } from "./selector";
import { fetchAllQuesttion } from "./slice";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const listQuestion = useAppSelector(getAllQuestion);
  const currentUser = useAppSelector(getCurrentUser);

  const filterQuestion = useMemo(() => {
    let dataAnswered: IQuestions = {};
    let dataUnanswered: IQuestions = {};

    if (currentUser) {
      for (const key in listQuestion) {
        if (
          listQuestion[key].optionOne.votes.includes(currentUser?.id) ||
          listQuestion[key].optionTwo.votes.includes(currentUser?.id)
        ) {
          dataAnswered[key] = listQuestion[key];
        } else {
          dataUnanswered[key] = listQuestion[key];
        }
      }
    } else {
      dataUnanswered = { ...listQuestion };
    }
    return [dataUnanswered, dataAnswered];
  }, [listQuestion]);

  useEffect(() => {
    dispatch(fetchAllQuesttion());
    dispatch(fetchAllUsers());
  }, []);
  return (
    <div className="wrapper-content">
      <ListQuestion title="New Question" questions={filterQuestion[0]} />
      <ListQuestion title="Done" questions={filterQuestion[1]} />
    </div>
  );
};

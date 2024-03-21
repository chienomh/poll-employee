import { useEffect, useMemo, useState } from "react";
import ListQuestion from "../../components/list-questions/ListQuestion";
import { IQuestions } from "../../components/list-questions/list-question.model";
import { useAppDispatch, useAppSelector } from "../../store";
import { getCurrentUser } from "../login-page/selector";
import "./home.scss";
import { getAllQuestion } from "./selector";
import { fetchAllQuesttion } from "./slice";
import { Tabs, Tab } from "react-bootstrap";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const listQuestion = useAppSelector(getAllQuestion);
  const currentUser = useAppSelector(getCurrentUser);
  const [key, setKey] = useState<string>("new_question");

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
    console.log(dataUnanswered, dataAnswered);
    return [dataUnanswered, dataAnswered];
  }, [listQuestion]);

  const handleGetAll = async () => {
    await dispatch(fetchAllQuesttion());
  };

  useEffect(() => {
    handleGetAll();
  }, []);
  return (
    <div className="wrapper-content">
      <Tabs
        activeKey={key}
        onSelect={(k) => {
          k && setKey(k);
        }}
        className="mb-3"
      >
        <Tab eventKey="new_question" title="New Question">
          <ListQuestion title="New Question" questions={filterQuestion[0]} />
        </Tab>
        <Tab eventKey="done" title="Done">
          <ListQuestion title="Done" questions={filterQuestion[1]} />
        </Tab>
      </Tabs>
    </div>
  );
};

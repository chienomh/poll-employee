import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { getAllQuestion } from "../home-page/selector";
import { getCurrentUser, getListUsers } from "../login-page/selector";
import { useEffect, useMemo, useState } from "react";
import { IQuestion } from "../../components/list-questions/list-question.model";
import { IUser } from "../login-page/login.model";
import "./detail-question.scss";
import { Button, Image } from "react-bootstrap";
import { postQuestionAnswared } from "./slice";
import { fetchAllQuesttion } from "../home-page/slice";
import { fetchAllUsers, setCurrentUser } from "../login-page/slice";

export default function DetailQuestion() {
  const dispatch = useAppDispatch();
  const listUser = useAppSelector(getListUsers);
  const listQuestion = useAppSelector(getAllQuestion);
  const currentUser = useAppSelector(getCurrentUser);
  const navigate = useNavigate();

  const { question_id } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | undefined>(
    undefined
  );
  const [author, setAuthor] = useState<IUser | undefined>(undefined);

  const isChoose = useMemo(() => {
    if (currentQuestion && currentUser) {
      if (currentQuestion?.id in currentUser?.answers) {
        return currentUser.answers[currentQuestion.id];
      } else return "";
    } else return "";
  }, [currentUser, currentQuestion]);

  useEffect(() => {
    if (question_id && listQuestion) {
      setCurrentQuestion(listQuestion[question_id]);
    }

    if (listUser) {
      listUser &&
        currentUser &&
        dispatch(setCurrentUser(listUser[currentUser?.id]));
    }
  }, [question_id, listQuestion, listUser]);

  useEffect(() => {
    if (currentQuestion && listUser) {
      setAuthor(listUser[currentQuestion.author]);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  const handleChooseOption = (option: string) => {
    if (currentQuestion && currentUser) {
      dispatch(
        postQuestionAnswared({
          answer: option,
          qid: currentQuestion?.id,
          authedUser: currentUser.id,
        })
      );
    }

    dispatch(fetchAllQuesttion());
    dispatch(fetchAllUsers());
  };

  const answaredOfCurrentUser = useMemo(() => {
    if (currentQuestion && currentUser) {
      if (currentUser?.answers.hasOwnProperty(currentQuestion?.id)) {
        return currentUser.answers[currentQuestion.id];
      } else {
        return false;
      }
    }
  }, [currentQuestion, currentUser]);

  const handleCalculationOfPercentages = useMemo(() => {
    const numberOfPeopleChoosingAnswerOne =
      currentQuestion?.optionOne.votes.length;
    const numberOfPeopleChoosingAnswerTwo =
      currentQuestion?.optionTwo.votes.length;
    let resuft: number[] = [];
    if (numberOfPeopleChoosingAnswerOne && listUser) {
      const percentageOfAnswareOne =
        (numberOfPeopleChoosingAnswerOne / Object.keys(listUser).length) * 100;
      resuft.push(percentageOfAnswareOne);
    } else {
      resuft.push(0);
    }

    if (listUser && numberOfPeopleChoosingAnswerTwo) {
      const percentageOfAnswareTwo =
        (numberOfPeopleChoosingAnswerTwo / Object.keys(listUser).length) * 100;
      resuft.push(percentageOfAnswareTwo);
    } else {
      resuft.push(0);
    }
    return resuft;
  }, [currentQuestion, listUser]);

  return (
    <div className="wrapper-detail-question">
      <div className="title">{`Poll by ${author?.name}`}</div>
      {author?.avatarURL && (
        <Image src={author.avatarURL} roundedCircle width={250} />
      )}
      <div className="title">Would You Rather</div>
      <div className="wrapper-options">
        <div
          className={`style-option ${isChoose === "optionOne" ? "chose" : ""}`}
        >
          <div className="text-option">{`${currentQuestion?.optionOne.text}`}</div>
          {!answaredOfCurrentUser ? (
            <Button
              variant="success"
              style={{ width: "100%" }}
              onClick={() => handleChooseOption("optionOne")}
            >
              Click
            </Button>
          ) : (
            <div className="infor-option">
              <div>
                Number of people choosing this answer:{" "}
                {`${currentQuestion?.optionOne.votes.length}`}
              </div>
              <div>Percentage: {`${handleCalculationOfPercentages[0]}%`}</div>
            </div>
          )}
        </div>
        <div
          className={`style-option ${isChoose === "optionTwo" ? "chose" : ""}`}
        >
          <div className="text-option">{`${currentQuestion?.optionTwo.text}`}</div>
          {!answaredOfCurrentUser ? (
            <Button
              variant="success"
              style={{ width: "100%" }}
              onClick={() => handleChooseOption("optionTwo")}
            >
              Click
            </Button>
          ) : (
            <div className="infor-option">
              <div>
                Number of people choosing this answer:{" "}
                {`${currentQuestion?.optionTwo.votes.length}`}
              </div>
              <div>Percentage: {`${handleCalculationOfPercentages[1]}%`}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

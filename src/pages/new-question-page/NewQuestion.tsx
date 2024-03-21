import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ISaveQuestionReq } from "../../components/list-questions/list-question.model";
import { useAppDispatch, useAppSelector } from "../../store";
import { IUsers } from "../login-page/login.model";
import { getCurrentUser, getListUsers } from "../login-page/selector";
import { setListUsers } from "../login-page/slice";
import "./new-question.scss";
import { getNewQuestionId, postAddQuestion, setNewQuestionId } from "./slice";

export default function NewQuestion() {
  const [addQuestionReq, setAddQuestionReq] = useState<ISaveQuestionReq>({
    author: "",
    optionOneText: "",
    optionTwoText: "",
  });
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(getCurrentUser);
  const listUsers = useAppSelector(getListUsers);
  const newQuestionId = useAppSelector(getNewQuestionId);
  const navigate = useNavigate();
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setAddQuestionReq({
      ...addQuestionReq,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (currentUser) {
      setAddQuestionReq({
        ...addQuestionReq,
        author: currentUser.id,
      });
    } else {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    if (newQuestionId && currentUser && listUsers) {
      const newListUser: IUsers = {
        ...listUsers,
        [currentUser.id]: {
          ...currentUser,
          questions: [...listUsers[currentUser.id].questions, newQuestionId],
        },
      };
      dispatch(setListUsers(newListUser));
      navigate("/");
    }
    return () => {
      dispatch(setNewQuestionId(undefined));
    };
  }, [newQuestionId]);

  const handleAddQuestion = async (event: any) => {
    if (currentUser && listUsers) {
      event.preventDefault();
      await dispatch(postAddQuestion(addQuestionReq));
    }
  };
  return (
    <div className="wrapper-add-question">
      <div className="title">Would You Rather</div>
      <div style={{ color: "#ccc" }}>Create Your Own Poll</div>
      <div style={{ width: "100%" }}>
        <Form onSubmit={handleAddQuestion} style={{ textAlign: "center" }}>
          <Form.Label htmlFor="firstOption">First Option</Form.Label>
          <Form.Control
            id="firstOption"
            placeholder="Option One"
            name="optionOneText"
            onBlur={handleBlur}
            required
          />

          <Form.Label htmlFor="secondOption">Second Option</Form.Label>
          <Form.Control
            id="secondOption"
            placeholder="Option Two"
            name="optionTwoText"
            onBlur={handleBlur}
            required
          />
          <Button
            variant="primary"
            style={{ width: "250px", marginTop: "20px" }}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

import { Button, Form } from "react-bootstrap";
import "./new-question.scss";
import { useEffect, useState } from "react";
import { ISaveQuestionReq } from "../../components/list-questions/list-question.model";
import { useAppDispatch, useAppSelector } from "../../store";
import { postAddQuestion } from "./slice";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../login-page/selector";

export default function NewQuestion() {
  const [addQuestionReq, setAddQuestionReq] = useState<ISaveQuestionReq>({
    author: "",
    optionOneText: "",
    optionTwoText: "",
  });
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(getCurrentUser);
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

  const handleAddQuestion = async (event: any) => {
    event.preventDefault();
    await dispatch(postAddQuestion(addQuestionReq));
    navigate("/");
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

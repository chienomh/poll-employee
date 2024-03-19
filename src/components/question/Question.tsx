import { Button } from "react-bootstrap";
import { IQuestion } from "../list-questions/list-question.model";
import "./question.scss";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import { getCurrentUser } from "../../pages/login-page/selector";

export default function Question(props: IQuestion) {
  const navigate = useNavigate();
  const currentUser = useAppSelector(getCurrentUser);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };

  const date = new Intl.DateTimeFormat("en-US", options).format(
    props.timestamp
  );

  const handleClickShow = () => {
    if (currentUser) {
      navigate(`/questions/${props.id}`);
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="wrapper-question">
      <div className="info-question">
        <div className="title-question">{props.author}</div>
        <div className="time-question">{date}</div>
      </div>
      <div className="show-button">
        <Button
          variant="outline-success"
          style={{ width: "100%" }}
          onClick={handleClickShow}
        >
          Show
        </Button>
      </div>
    </div>
  );
}

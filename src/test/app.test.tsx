import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "src/pages/login-page/Login";
import { renderWithProviders } from "./test-utils";
import { HomePage } from "src/pages/home-page/HomePage";
import Question from "src/components/question/Question";
import LeaderBoardPage from "src/pages/leader-board-page/LeaderBoardPage";
import { _saveQuestion, _saveQuestionAnswer } from "src/data/_DATA";

describe("Test my application", () => {
  test("render application", () => {
    const { getByText } = renderWithProviders(
      <Router>
        <Login />
      </Router>
    );

    const title = getByText("Login Employee Polls");
    expect(title).toBeInTheDocument();
  });

  test("Test login success", () => {
    const { getByTestId, getByDisplayValue, getByRole } = renderWithProviders(
      <Router>
        <Login />
      </Router>
    );
    const userInput = getByTestId("user");
    const passwordInput = getByTestId("password");

    expect(userInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(userInput, { target: { value: "sarahedo" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    const userInputValue = getByDisplayValue("sarahedo");
    expect(userInputValue).toBeInTheDocument();

    const loginBtn = getByRole("button", { name: "Login" });
    expect(loginBtn).toBeInTheDocument();

    fireEvent.click(loginBtn);
    expect(window.location.pathname).toBe("/");
  });

  test("Test home", () => {
    const { getByText } = renderWithProviders(
      <Router>
        <HomePage />
      </Router>,
      {
        preloadedState: {
          home: {
            listQuestion: {
              am8ehyc8byjqgar0jgpub9: {
                id: "am8ehyc8byjqgar0jgpub9",
                author: "sarahedo",
                timestamp: 1488579767190,
                optionOne: {
                  votes: [],
                  text: "conduct a release retrospective 1 week after a release",
                },
                optionTwo: {
                  votes: ["sarahedo"],
                  text: "conduct release retrospectives quarterly",
                },
              },
            },
            isLoading: "",
          },
        },
      }
    );

    const titleListQuestion = getByText("New Question");
    expect(titleListQuestion).toBeInTheDocument();

    const authorQuestion = getByText("sarahedo");
    expect(authorQuestion).toBeInTheDocument();
  });

  test("Should navigate /login if if the user is not logged in", () => {
    const { getByRole } = renderWithProviders(
      <Router>
        <Question
          author="sarahedo"
          id="123123123"
          optionOne={{
            votes: [],
            text: "conduct a release retrospective 1 week after a release",
          }}
          optionTwo={{
            votes: ["sarahedo"],
            text: "conduct release retrospectives quarterly",
          }}
          timestamp={1482579767190}
        />
      </Router>
    );

    const showBtn = getByRole("button", { name: "Show" });
    fireEvent.click(showBtn);

    expect(window.location.pathname).toBe("/login");
  });

  test("Should navigate /question/:question_id if if the user is logged in", () => {
    const { getByRole } = renderWithProviders(
      <Router>
        <Question
          author="sarahedo"
          id="123123123"
          optionOne={{
            votes: [],
            text: "conduct a release retrospective 1 week after a release",
          }}
          optionTwo={{
            votes: ["sarahedo"],
            text: "conduct release retrospectives quarterly",
          }}
          timestamp={1482579767190}
        />
      </Router>,
      {
        preloadedState: {
          login: {
            isLoading: "",
            users: undefined,
            currentUser: {
              id: "sarahedo",
              password: "password123",
              name: "Sarah Edo",
              avatarURL:
                "https://static.vecteezy.com/system/resources/thumbnails/002/002/427/small/man-avatar-character-isolated-icon-free-vector.jpg",
              answers: {
                "8xf0y6ziyjabvozdd253nd": "optionOne",
                "6ni6ok3ym7mf1p33lnez": "optionOne",
                am8ehyc8byjqgar0jgpub9: "optionTwo",
                loxhs1bqm25b708cmbf3g: "optionTwo",
              },
              questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
            },
          },
        },
      }
    );

    const showBtn = getByRole("button", { name: "Show" });
    fireEvent.click(showBtn);

    expect(window.location.pathname).toBe("/questions/123123123");
  });

  test("Should show leader board when user logged in", () => {
    const { getByText } = renderWithProviders(
      <Router>
        <LeaderBoardPage />
      </Router>,
      {
        preloadedState: {
          login: {
            isLoading: "",
            users: {
              sarahedo: {
                id: "sarahedo",
                password: "password123",
                name: "Sarah Edo",
                avatarURL:
                  "https://static.vecteezy.com/system/resources/thumbnails/002/002/427/small/man-avatar-character-isolated-icon-free-vector.jpg",
                answers: {
                  "8xf0y6ziyjabvozdd253nd": "optionOne",
                  "6ni6ok3ym7mf1p33lnez": "optionOne",
                  am8ehyc8byjqgar0jgpub9: "optionTwo",
                  loxhs1bqm25b708cmbf3g: "optionTwo",
                },
                questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
              },
            },
            currentUser: {
              id: "sarahedo",
              password: "password123",
              name: "Sarah Edo",
              avatarURL:
                "https://static.vecteezy.com/system/resources/thumbnails/002/002/427/small/man-avatar-character-isolated-icon-free-vector.jpg",
              answers: {
                "8xf0y6ziyjabvozdd253nd": "optionOne",
                "6ni6ok3ym7mf1p33lnez": "optionOne",
                am8ehyc8byjqgar0jgpub9: "optionTwo",
                loxhs1bqm25b708cmbf3g: "optionTwo",
              },
              questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
            },
          },
        },
      }
    );

    const title = getByText("Answered");
    expect(title).toBeInTheDocument();
  });

  test("Should show navigate /login board when user not logged in", () => {
    renderWithProviders(
      <Router>
        <LeaderBoardPage />
      </Router>
    );

    expect(window.location.pathname).toBe("/login");
  });

  test("Save question success", async () => {
    const response = await _saveQuestion({
      optionOneText: "React",
      optionTwoText: "Vuejs",
      author: "sarahedo",
    });

    expect(response).toBeTruthy();
  });

  test("save question faild", async () => {
    const response = await _saveQuestion({
      optionOneText: "React",
      optionTwoText: "Vuejs",
      author: undefined,
    }).catch((error) => error);

    expect(response).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  test("save question answer success", async () => {
    const response = await _saveQuestionAnswer({
      answer: "optionOne",
      qid: "xj352vofupe1dqz9emx13r",
      authedUser: "sarahedo",
    });
    expect(response).toBeTruthy();
  });

  test("save question answer fail", async () => {
    const response = await _saveQuestionAnswer({
      answer: "optionOne",
      qid: "123123",
      authedUser: 0,
    }).catch((error) => error);
    expect(response).toBe("Please provide authedUser, qid, and answer");
  });

  test("render snapshot", () => {
    const component = renderWithProviders(
      <Router>
        <LeaderBoardPage />
      </Router>
    );

    expect(component).toMatchSnapshot();
  });
});

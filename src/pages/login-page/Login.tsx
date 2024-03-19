import { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { IFormData } from "./login.model";
import "./login.scss";
import { getListUsers } from "./selector";
import { fetchAllUsers, setCurrentUser } from "./slice";

export default function Login() {
  const [formData, setFormData] = useState<IFormData>({
    password: "",
    user: "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const listUser = useAppSelector(getListUsers);

  const handleChangeInput = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (listUser) {
      for (const key in listUser) {
        if (
          key === formData.user &&
          listUser[key].password === formData.password
        ) {
          dispatch(setCurrentUser(listUser[key]));
          break;
        }
      }
    }
    navigate("/");
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  return (
    <Container>
      <div className="wrapper-login">
        <div className="header">Login Employee Polls</div>
        <Image
          src="https://bc.hocthionline.net/wp-content/uploads/2023/04/Login.jpg"
          alt="this is login image"
          width={500}
        />
        <div className="form">
          <Form>
            <Form.Label htmlFor="inputUser5">User</Form.Label>
            <Form.Control
              type="text"
              id="inputUser5"
              aria-describedby="passwordHelpBlock"
              onBlur={handleChangeInput}
              name="user"
              data-testid="user"
            />
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
              type="Password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              onBlur={handleChangeInput}
              name="password"
              data-testid="password"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                variant="primary"
                style={{ width: "200px" }}
                type="submit"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
}

import { Button, Container, Image, Nav } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../pages/login-page/selector";
import { useAppSelector } from "../../store";
import "./header.scss";

export default function Header() {
  const navigate = useNavigate();
  const currentUser = useAppSelector(getCurrentUser);

  const handleClickLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div style={{ padding: "30px" }} className="wrapper-header">
        <Nav
          defaultActiveKey="/"
          style={{
            display: "flex",
            gap: "20px",
            fontWeight: "bold",
            alignItems: "center",
          }}
        >
          <Nav.Item>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active" : "default-link"
              }
            >
              Home
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              to="/leader-board"
              className={({ isActive }) =>
                isActive ? "active" : "default-link"
              }
            >
              Leaderboard
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive ? "active" : "default-link"
              }
            >
              New
            </NavLink>
          </Nav.Item>
        </Nav>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {currentUser?.avatarURL && (
            <div>
              <Image src={currentUser.avatarURL} roundedCircle width={50} />
              <span>{currentUser.name}</span>
            </div>
          )}
          {currentUser?.id ? (
            <Button
              variant="danger"
              size="sm"
              style={{ height: "40px" }}
              onClick={handleClickLogin}
            >
              Logout
            </Button>
          ) : (
            <Button variant="primary" onClick={handleClickLogin}>
              Login
            </Button>
          )}
        </div>
      </div>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

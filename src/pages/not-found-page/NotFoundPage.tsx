import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const handleClickGoHome = () => {
    navigate("/");
  };
  return (
    <div style={{ padding: "20px" }}>
      <div>
        <Button variant="primary" onClick={handleClickGoHome}>
          Go Home
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710720000&semt=ais" />
      </div>
    </div>
  );
}

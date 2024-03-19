import { Image, Table } from "react-bootstrap";
import { useAppSelector } from "../../store";
import { getCurrentUser, getListUsers } from "../login-page/selector";
import { IUser } from "../login-page/login.model";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const handleSort = (a: IUser, b: IUser) => {
  const totalA = a.questions.length + Object.keys(a.answers).length;
  const totalB = b.questions.length + Object.keys(b.answers).length;
  return totalA > totalB ? -1 : 1;
};

export default function LeaderBoardPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const listUsers = useAppSelector(getListUsers);
  const currentUser = useAppSelector(getCurrentUser);
  const navigate = useNavigate();
  useEffect(() => {
    const filterUser: IUser[] = [];
    if (listUsers && currentUser) {
      Object.values(listUsers).forEach((item) => filterUser.push(item));
      setUsers(filterUser.sort((a, b) => handleSort(a, b)));
    } else {
      navigate("/login");
    }
  }, [listUsers]);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.id}>
              <td style={{ display: "flex", gap: "10px" }}>
                {item.avatarURL && (
                  <Image src={item.avatarURL} roundedCircle width={50} />
                )}
                <div>
                  <div style={{ fontWeight: "bold" }}>{item.name}</div>
                  <div>{item.id}</div>
                </div>
              </td>
              <td>{Object.keys(item.answers).length}</td>
              <td>{item.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

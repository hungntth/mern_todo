import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import todoApi from "../src/api/todoApi";
import "./App.css";


function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const loadTodo = async () => {
    try {
      const { data } = await todoApi.getAll();
      setTodoList(data);
    } catch (error) {
      console.log("Failed to fetch product list: ", error);
    }
  };
  useEffect(() => {
    loadTodo();
  }, []);

  const handleSubmit = async () => {
    const body = {
      task: todo,
      key: todo._id,
    };
    await todoApi.add(body);
    loadTodo();
  };

  const handleDelete = async (id) => {
    await todoApi.remove(id);
    loadTodo();
  };

  return (
    <>
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img
            src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
            width="30"
            height="30"
            alt=""
          ></img>
        </a>
      </nav>
      <Container>
        <Row style={{ marginTop: 10 }}>
          <Col></Col>
          <Col>
            <Form>
              <Row className="align-items-center">
                <Col xs="auto">
                  <Form.Control
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Todo"
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    type="submit"
                    className="mb-2"
                    variant="primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          {todoList.map((todo) => (
            <Col xs={6} style={{ marginTop: 10, textAlign: "center" }} key={todo._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{todo.task}</Card.Title>
                  <Button onClick={() => handleDelete(todo._id)} variant="danger">Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}

        </Row>
      </Container>
      <Container></Container>
    </>
  );
}

export default App;

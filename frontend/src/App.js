import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import todoApi from '../src/api/todoApi';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'



function App() {
  const [todo, setTodo] = useState('')
  const [todoList, setTodoList] = useState([]);
  const loadTodo = async () => {

    try {
      const { data } = await todoApi.getAll();
      setTodoList(data);
    } catch (error) {
      console.log('Failed to fetch product list: ', error);
    }



  }
  useEffect(() => {
    loadTodo();

  }, []);

  const handleSubmit = async () => {
    const body = {
      task: todo,
      key: todo._id
    }
    await todoApi.add(body);
    loadTodo();



  }

  const handleDelete = async (id) => {
    await todoApi.remove(id);
    loadTodo();
  }


  return (
    <>

      <Card style={{ padding: 32 }}>
        <Form>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Control
                value={todo} onChange={e => setTodo(e.target.value)}
                className="mb-2"
                id="inlineFormInput"
                placeholder="Todo"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" className="mb-2" variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        <Card style={{ width: '28rem' }}>


          {todoList.map((todo) => (
            <Row key={todo._id}>
              <Col xs="9" >
                {todo.task}
              </Col>
              <Col>
                <Button variant="danger" style={{ margin: 2 }} className="btn-floating" onClick={() => handleDelete(todo._id)}>Delete</Button>
              </Col>
            </Row>
          ))}



        </Card>
      </Card>

    </>
  );
}

export default App;

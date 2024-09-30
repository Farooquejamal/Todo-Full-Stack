import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoContainer from "./components/TodoContainer";
import api from "./api";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [todoId, setTodoId] = useState(null);

  const newTodo = {
    title: searchValue,
  };

  useEffect(() => {
    api
      .get("notes/")
      .then((res) => {
        console.log(res.data);
        setToDos(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const createToDo = () => {
    api
      .post("notes/", newTodo)
      .then((res) => {
        console.log(res.data);
        setToDos([...toDos, res.data]);
      })
      .catch((err) => console.log(err.message));
  };

  const updateTodo = () => {
    api
      .put(`notes/${todoId}/`, newTodo)
      .then((res) => {
        setToDos(toDos.map((todo) => (todo.id === todoId ? res.data : todo)));
        setTodoId("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const deleteTodo = (ID) => {
    api
      .delete(`notes/${ID}/`)
      .then((res) => {
        setToDos(toDos.filter((todo) => todo.id != ID));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <div className="container">
        <Header
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          createToDo={createToDo}
          todoId={todoId}
          updateTodo={updateTodo}
        />
        <TodoContainer
          toDos={toDos}
          setSearchValue={setSearchValue}
          setTodoId={setTodoId}
          deleteTodo ={deleteTodo}
        />
      </div>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { BsTrash3Fill } from "react-icons/bs";
import api from "../api";

const TodoItem = ({ todo, setSearchValue, setTodoId, deleteTodo }) => {
  const [iscompleted, setIsCompleted] = useState(todo.completed);

  const todoID = {
    todo_id: todo.id,
  };
  function handleCompleteTodo() {
    api
      .post("complete_todo/", todoID)
      .then((res) => {
        setIsCompleted((curr) => !curr);
      })
      .catch((err) => console.log(err.message));
  }
  function handleClick() {
    setSearchValue(todo.title);
    setTodoId(todo.id);
  }
  function handleDelete() {
    deleteTodo(todo.id);
  }
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input
          type="checkbox"
          onChange={handleCompleteTodo}
          checked={iscompleted}
        />
        <span className={iscompleted ? "line-through" : ""}>{todo.title}</span>
      </div>

      <div>
        <FaRegPenToSquare onClick={handleClick} />
        <BsTrash3Fill onClick={handleDelete} />
      </div>
    </li>
  );
};

export default TodoItem;

import React from "react";
import TodoItem from "./TodoItem";

const TodoContainer = ({ toDos, setSearchValue, setTodoId, deleteTodo }) => {
  return (
    <ul className="list-group todos mx-auto text-light delete">
      {toDos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setSearchValue={setSearchValue}
          setTodoId={setTodoId}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoContainer;

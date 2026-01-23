import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
//COMPONENTS
import Todo from "./todo";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "../context/todoContext";
import { useContext, useState, useEffect } from "react";
export default function TodoList() {
  const { todos, settodos } = useContext(TodoContext);
  const [todoType, setTodoType] = useState("all");
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });
  const noncompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });
  let todosToBeRendered = todos;
  if (todoType == "all") {
    todosToBeRendered = todos;
  } else if (todoType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (todoType == "non-completed") {
    todosToBeRendered = noncompletedTodos;
  }

  const [titleInput, setTitle] = useState("");

  const Todosjsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    settodos(storageTodos);
  });
  function hundlAddClick() {
    const newtodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedtodos = [...todos, newtodo];
    settodos(updatedtodos);
    localStorage.setItem("todos", JSON.stringify(updatedtodos));
  }
  function changeTodo(e) {
    setTodoType(e.target.value);
    settodos;
  }

  return (
    <Container maxWidth="sm">
      <Card
        variant="outlined"
        style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h2" style={{ fontWeight: "bold" }}>
            مهامي
          </Typography>
          <Divider />

          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "30px" }}
            exclusive
            aria-label="text alignment"
            value={todoType}
            onChange={changeTodo}
          >
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {Todosjsx}
          <Grid container spacing={2} style={{ marginTop: "5px" }}>
            <Grid
              size={8}
              display="felx"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                id="outlined-basic"
                label="عنوان المهمة "
                variant="outlined"
                style={{ width: "100%" }}
                value={titleInput}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Grid>
            <Grid
              size={4}
              display="felx"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                onClick={() => {
                  hundlAddClick();
                }}
                variant="contained"
                style={{ width: "100% ", height: "100%" }}
              >
                اضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

import "./App.css";
import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodoContext } from "./context/todoContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
});
const initialtodos = [
  {
    id: uuidv4(),
    title: "1عنوان المهمة   ",
    details: "تفاصيل المهمة ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "2عنوان المهمة   ",
    details: "تفاصيل المهمة ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "عنوان المهمة 3   ",
    details: "تفاصيل المهمة ",
    isCompleted: false,
  },
];

function App() {
  const [todos, settodos] = useState(initialtodos);
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#191b1f",
          minHeight: "100vh",
          direction: "rtl",
        }}
      >
        <TodoContext.Provider value={{ todos, settodos }}>
          <TodoList />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;

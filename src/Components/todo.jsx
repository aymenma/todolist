import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { TodoContext } from "../context/todoContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function Todo({ todo }) {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpadte] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateOpen = () => {
    setOpenUpadte(true);
  };

  const handleUpdateClose = () => {
    setOpenUpadte(false);
  };
  function hundleDeletConfirm() {
    const updatetodos = todos.filter((t) => {
      if (t.id == todo.id) {
        return false;
      } else {
        return true;
      }
    });
    settodos(updatetodos);
    localStorage.setItem("todos", JSON.stringify(updatetodos));
  }
  function hundleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: updateTodo.title, details: updateTodo.details };
      } else {
        return t;
      }
    });
    settodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    handleUpdateClose();
  }

  const { todos, settodos } = useContext(TodoContext);
  function handleCheckClick() {
    const updatetodo = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;

        // if (t.isCompleted == true) {
        //   t.isCompleted = false;
        // } else {
        //   t.isCompleted = true;
        // }
      }
      return t;
    });
    settodos(updatetodo);

    localStorage.setItem("todos", JSON.stringify(updatetodo));
  }
  return (
    <>
      {/* delet dialog  */}
      <Dialog
        style={{ direction: "rtl" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من حذف المهمة ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع م الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>اغلاق</Button>
          <Button onClick={hundleDeletConfirm} autoFocus>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* delet dialog */}
      {/* update dialog  */}

      <Dialog
        style={{ direction: "rtl" }}
        open={openUpdate}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل مهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="عنوان المهمة "
            fullWidth
            variant="standard"
            value={updateTodo.title}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updateTodo.details}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>اغلاق</Button>
          <Button onClick={hundleUpdateConfirm} autoFocus>
            تاكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* update dialog  */}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "#fff",
          marginTop: "5px",
        }}
      >
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <Typography variant="h5" sx={{ textAlign: "right" }}>
                  {todo.title}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "right" }}>
                  {todo.details}
                </Typography>
              </Grid>
              <Grid size={4}>
                <IconButton
                  onClick={() => {
                    handleCheckClick();
                  }}
                >
                  <i
                    className={"material-icons IconButton"}
                    style={{
                      borderRadius: "50px",
                      color: todo.isCompleted ? "white" : "#8bc34a",

                      background: todo.isCompleted ? "#8bc34a" : "white",
                      border: "solid #8bc34a 2px",
                    }}
                  >
                    check
                  </i>
                </IconButton>
                <IconButton
                  onClick={() => {
                    handleUpdateOpen();
                  }}
                >
                  <i
                    className={"material-icons IconButton"}
                    style={{
                      borderRadius: "50px",
                      color: "#1769aa",
                      background: "white",
                      border: "solid #1769aa 3px",
                    }}
                  >
                    edit
                  </i>
                </IconButton>
                <IconButton
                  onClick={() => {
                    handleClickOpen();
                  }}
                >
                  <i
                    className={"material-icons IconButton"}
                    style={{
                      borderRadius: "50px",
                      color: "#b23c17",
                      background: "white",
                      border: "solid #b23c17 3px",
                    }}
                  >
                    delete
                  </i>
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

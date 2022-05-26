import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  CssBaseline,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { Header } from "../../components/Header";
import { db } from "../../lib/firebase";
import { dateFormat } from "../../components/DateFormat";

export default function todos() {
  const [status, setStatus] = useState("NONE");
  const [priority, setPriority] = useState("None");

  const statusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  const priorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const [todos, setTodos] = useState([
    {
      id: "",
      task: "",
      status: "",
      priority: "",
      createdAt: "",
      updatedAt: "",
    },
  ]);
  const q = query(collection(db, "todos"), orderBy("createdAt"));
  useEffect(() => {
    const unSub = onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((todo) => ({
          id: todo.id,
          task: todo.data().task,
          status: todo.data().status,
          priority: todo.data().priority,
          createdAt: dateFormat(todo.data().createdAt),
          updatedAt: dateFormat(todo.data().updatedAt),
        }))
      );
    });

    return () => unSub();
  }, []);

  const deleteTodo = (e: any) => {
    const todoId = e.target.parentNode.parentNode.id;
    deleteDoc(doc(db, "todos", todoId));
  };
  const changeStatus = (e: any) => {
    const status = e.target.value;
    let todoId = "";
    if (status.match("NOT STARTED")) {
      todoId = status.slice(12);
    } else if (status.match("DOING")) {
      todoId = status.slice(6);
    } else {
      todoId = status.slice(5);
    }
    updateDoc(doc(db, "todos", todoId), {
      status: status,
    });
  };
  return (
    <>
      <Header />
      <Container
        component="main"
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          marginBottom: "30px",
        }}
      >
        <CssBaseline />
        <Typography
          component="h1"
          variant="h4"
          mt={3}
          mb={2}
          sx={{ fontWeight: "bold" }}
        >
          TODO LIST
        </Typography>
        <Box mb={3} sx={{ display: "flex", overflowX: "auto" }}>
          <Box mr={3} sx={{ width: "190px" }}>
            <Typography variant="h6">SEARCH</Typography>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                border: "1px solid black",
                borderRadius: "10px",
                boxShadow: "none",
                marginTop: "16px",
                marginBottom: "8px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, fontWeight: "bold" }}
                placeholder="Text"
                inputProps={{ "aria-label": "search todo text" }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
          <Box mr={3} sx={{ width: "190px" }}>
            <Typography variant="h6">STATUS</Typography>
            <FormControl
              fullWidth
              sx={{
                border: "1px solid black",
                borderRadius: "10px",
                marginTop: "16px",
                marginBottom: "8px",
                height: "50px",
              }}
            >
              <Select value={status} onChange={statusChange}>
                <MenuItem value="NONE">- - - - - - -</MenuItem>
                <MenuItem value="NOT STARTED">NOT STARTED</MenuItem>
                <MenuItem value="DOING">DOING</MenuItem>
                <MenuItem value="DONE">DONE</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mr={3} sx={{ width: "190px" }}>
            <Typography variant="h6">PRIORITY</Typography>
            <FormControl
              fullWidth
              sx={{
                marginTop: "16px",
                marginBottom: "8px",
                border: "1px solid black",
                borderRadius: "10px",
                height: "50px",
              }}
            >
              <Select value={priority} onChange={priorityChange}>
                <MenuItem value="None">- - - - - - -</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Middle">Middle</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            mr={3}
            sx={{
              width: "190px",
              display: "flex",
              alignItems: "flex-end",
              marginBottom: "8px",
            }}
          >
            <ResetBtn>RESET</ResetBtn>
          </Box>
          <Box
            sx={{
              background: "#68D391",
              border: "8px solid #68D391",
              borderRadius: "30px",
              height: "50px",
              width: "50px",
              "&:hover": {
                background: "#55ab76",
                borderColor: "#55ab76",
                color: "white",
              },
            }}
          >
            <Link href="/todos/create">
              <OpenInNewIcon sx={icon} />
            </Link>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ background: "#68D391" }}>
                <TableCell sx={{ fontSize: "24px", fontWeight: "bold" }}>
                  Task
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Priority
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Create
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Update
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo) => (
                <TableRow
                  key={todo.id}
                  id={todo.id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    <Link href={`/todos/${todo.id}`}>{todo.task}</Link>
                  </TableCell>
                  <TableCell align="right">
                    <FormControl fullWidth>
                      <Select
                        value={todo.status}
                        onChange={changeStatus}
                        sx={{
                          border: "2px solid gray",
                          borderRadius: "15px",
                          textAlign: "left",
                          height: "50px",
                        }}
                      >
                        <MenuItem value={`NOT STARTED-${todo.id}`}>
                          NOT STARTED
                        </MenuItem>
                        <MenuItem value={`DOING-${todo.id}`}>DOING</MenuItem>
                        <MenuItem value={`DONE-${todo.id}`}>DONE</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "20px" }}>
                    {todo.priority}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    {todo.createdAt}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    {todo.updatedAt}
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`/todos/${todo.id}/edit`}>
                      <EditOutlinedIcon
                        sx={{
                          borderRadius: "8px",
                          marginRight: "10px",
                          "&:hover": {
                            background: "gray",
                            color: "white",
                          },
                        }}
                      />
                    </Link>
                    <DeleteOutlineOutlinedIcon
                      sx={{
                        borderRadius: "8px",
                        "&:hover": {
                          background: "gray",
                          color: "white",
                        },
                      }}
                      onClick={deleteTodo}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

const ResetBtn = styled("button")({
  background: "#B5B5B5",
  border: "1px solid black",
  borderRadius: "50px",
  color: "black",
  fontSize: "20px",
  fontWeight: "bold",
  height: "50px",
  padding: "10px 20px",
  verticalAlign: "bottom",
  "&:hover": {
    background: "#858585",
    color: "white",
  },
});

const icon = {
  positon: "absolute",
  top: "0",
  right: "0",
  left: "0",
  bottom: "0",
  margin: "auto",
  width: "100%",
  height: "100%",
};

import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
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

import { Header } from "components/Header";
import { db } from "lib/firebase";
import { dateFormat } from "utils/DateFormat";
import { useUser } from "lib/auth";

export default function Todos() {
  const router = useRouter();
  const user = useUser();
  const userEmail = user !== null ? user.email : "";
  const [searchTask, setSearchTask] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchStatus, setSearchStatus] = useState("NONE");
  const [searchPriority, setSearchPriority] = useState("None");

  const jumpTop = () => {
    router.replace("/");
  };

  const searchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value as string);
  };
  const searchStatusChange = (event: SelectChangeEvent) => {
    setSearchStatus(event.target.value as string);
  };
  const searchPriorityChange = (event: SelectChangeEvent) => {
    setSearchPriority(event.target.value as string);
  };
  const searchTextClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    setSearchTask(searchText);
  };
  const resetClick = () => {
    setSearchTask("");
    setSearchText("");
    setSearchStatus("NONE");
    setSearchPriority("None");
  };

  const [todos, setTodos] = useState([
    {
      id: "",
      task: "",
      status: "",
      priority: "",
      createdAt: "",
      updatedAt: "",
      user: "",
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
          user: todo.data().user,
        }))
      );
    });

    return () => unSub();
  }, []);

  const deleteTodo = (e: any) => {
    const todoId = e.target.parentNode.parentNode.id;
    deleteDoc(doc(db, "todos", todoId));
  };
  const changeStatus = (e: SelectChangeEvent) => {
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
      {userEmail !== "" ? (
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
            <Box sx={{ display: "flex" }}>
              <Typography
                component="h1"
                variant="h4"
                mt={3}
                mb={2}
                sx={{ fontWeight: "bold" }}
              >
                TODO LIST
              </Typography>
              <Button
                onClick={jumpTop}
                sx={{
                  backgroundColor: "rgb(0,150,10)",
                  color: "white",
                  marginTop: "10px",
                  marginLeft: "auto",
                  height: "50px",
                  "&:hover": {
                    background: "#55ab76",
                    borderColor: "#55ab76",
                    color: "white",
                  },
                }}
              >
                Topページへ
              </Button>
            </Box>
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
                    value={searchText}
                    onChange={searchTextChange}
                  />
                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={searchTextClick}
                  >
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
                  <Select value={searchStatus} onChange={searchStatusChange}>
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
                  <Select
                    value={searchPriority}
                    onChange={searchPriorityChange}
                  >
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
                <ResetBtn onClick={resetClick}>RESET</ResetBtn>
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
                  {todos.map((todo) => {
                    if (
                      userEmail === todo.user &&
                      todo.task.match(searchTask) &&
                      (todo.status.match(searchStatus) ||
                        searchStatus === "NONE") &&
                      (searchPriority === todo.priority ||
                        searchPriority === "None")
                    ) {
                      return (
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
                                {todo.status === "NOT STARTED" ? (
                                  <MenuItem value="NOT STARTED">
                                    NOT STARTED
                                  </MenuItem>
                                ) : (
                                  <MenuItem value={`NOT STARTED-${todo.id}`}>
                                    NOT STARTED
                                  </MenuItem>
                                )}

                                <MenuItem value={`DOING-${todo.id}`}>
                                  DOING
                                </MenuItem>
                                <MenuItem value={`DONE-${todo.id}`}>
                                  DONE
                                </MenuItem>
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
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </>
      ) : (
        <>
          <h1>ログインをしてください</h1>
          <Button
            onClick={jumpTop}
            sx={{
              backgroundColor: "rgb(0,150,10)",
              color: "white",
              marginTop: "10px",
              marginLeft: "auto",
              height: "50px",
              "&:hover": {
                background: "#55ab76",
                borderColor: "#55ab76",
                color: "white",
              },
            }}
          >
            Topページへ
          </Button>
        </>
      )}
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

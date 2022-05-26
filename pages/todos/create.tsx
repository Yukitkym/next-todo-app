import { useState } from "react";
import { useRouter } from "next/router";
import { TextareaAutosize } from "@material-ui/core";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { Header } from "../../components/Header";
import { db } from "../../lib/firebase";
import { useUser } from "../../lib/auth";

export default function create() {
  const [task, setTask] = useState("");
  const [detail, setDetail] = useState("");
  const [priority, setPriority] = useState("Middle");
  const router = useRouter();
  const colRef = collection(db, "todos");
  const user = useUser() !== null ? useUser()!.email : "";

  const newTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addDoc(colRef, {
      task: task,
      detail: detail,
      priority: priority,
      status: "NOT STARTED",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      user: user,
    });
    router.replace("/todos");
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              marginLeft: 85,
            }}
          >
            <Button
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: "#68D391",
                "&:hover": {
                  background: "#68D391",
                  opacity: [0.9, 0.8, 0.7],
                },
                borderRadius: 25,
              }}
            >
              Back
            </Button>
          </Box>
          <Box
            sx={{
              alignItems: "left",
            }}
          >
            <Typography component="h1" variant="h4">
              NEW TODO
            </Typography>
          </Box>
          <Box component="form" onSubmit={newTask} noValidate sx={{ mt: 1 }}>
            <Typography component="h2" variant="h6">
              TASK
            </Typography>
            <TextareaAutosize
              style={{
                resize: "none",
                width: 800,
                height: 50,
              }}
              required
              name="task"
              id="task"
              autoComplete="task"
              placeholder="Text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Typography component="h2" variant="h6">
              DETAIL
            </Typography>
            <TextareaAutosize
              style={{
                resize: "none",
                width: 800,
                height: 200,
              }}
              required
              name="detail"
              id="detail"
              autoComplete="detail"
              placeholder="Text"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
            <br />
            <FormControl>
              <FormLabel id="priority">PRIORITY</FormLabel>
              <RadioGroup
                row
                aria-labelledby="priority"
                defaultValue="priority"
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <FormControlLabel
                  value="High"
                  control={<Radio />}
                  label="High"
                />
                <FormControlLabel
                  value="Middle"
                  control={<Radio />}
                  label="Middle"
                />
                <FormControlLabel value="Low" control={<Radio />} label="Low" />
              </RadioGroup>
            </FormControl>
            <Box
              sx={{
                marginLeft: 75,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  color: "#333333",
                  background: "#fce2ea",
                  "&:hover": {
                    background: "#ffefd5",
                    opacity: [0.9, 0.8, 0.7],
                  },
                  borderRadius: 25,
                  marginRight: 2,
                }}
              >
                DRAFT
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: "#26855A",
                  "&:hover": {
                    background: "#2bb32b",
                    opacity: [0.9, 0.8, 0.7],
                  },
                  borderRadius: 25,
                }}
              >
                CREATE
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

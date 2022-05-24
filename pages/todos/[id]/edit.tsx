import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Container,
  FormLabel,
  OutlinedInput,
  Typography,
  Box,
  Stack,
  styled,
} from "@mui/material";

import { Header } from "../../../components/Header";
import { db } from "../../../lib/firebase";

export default function todoEdit() {
  const router = useRouter();
  const taskId = typeof router.query.id !== "object" ? router.query.id : "";
  const [task, setTask] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    if (router.isReady) {
      const accessDb = async () => {
        try {
          const todosDb = db.collection("todos").doc(taskId);
          const todoDoc = await todosDb.get();
          if (todoDoc.exists) {
            setTask(todoDoc.get("task"));
            setDetail(todoDoc.get("detail"));
          } else {
            console.log("No such document!");
          }
        } catch (err) {
          console.log(`Error: ${JSON.stringify(err)}`);
        }
      };
      accessDb();
    }
  }, [taskId, router]);

  const editTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("todos")
      .doc(taskId)
      .set({ task: task, detail: detail }, { merge: true });
  };

  return (
    <>
      <Header />
      <Container component="div">
        <Stack spacing={2} my={3}>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              component="h2"
              fontSize="24px"
              fontWeight={600}
              alignSelf="center"
            >
              EDIT TODO
            </Typography>
            <Link href={`/todos/${taskId}`}>
              <SButton
                sx={{
                  backgroundColor: "#9ae6b4",
                  color: "#000",
                  "&:hover": { backgroundColor: "#9ae6b4" },
                }}
              >
                Back
              </SButton>
            </Link>
          </Box>
          <form onSubmit={editTask}>
            <Stack spacing={3}>
              <FormLabel sx={{ fontWeight: 600, fontSize: "20px" }}>
                <div>TASK</div>
                <OutlinedInput
                  id="task"
                  name="task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  fullWidth
                  sx={{ fontWeight: 600, borderRadius: "10px" }}
                />
              </FormLabel>
              <FormLabel sx={{ fontWeight: 600, fontSize: "20px" }}>
                <div>DETAIL</div>
                <OutlinedInput
                  id="detail"
                  name="detail"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  fullWidth
                  multiline
                  sx={{
                    minHeight: "280px",
                    alignItems: "start",
                    fontWeight: 600,
                    borderRadius: "10px",
                  }}
                />
              </FormLabel>
              <Box
                component="div"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <SButton
                  type="submit"
                  sx={{
                    bgcolor: "#38a169",
                    color: "#fff",
                    "&:hover": { bgcolor: "#38a169" },
                  }}
                >
                  UPDATE
                </SButton>
              </Box>
            </Stack>
          </form>
        </Stack>
      </Container>
    </>
  );
}

// Button 共通スタイル
const SButton = styled("button")({
  height: "40px",
  width: "112px",
  borderRadius: "100px",
  border: "1px solid #000",
  fontWeight: 600,
  "&:hover": {
    opacity: 0.7,
  },
});

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  Button,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Container from "@mui/material/Container";

import { Header } from "../../../components/Header";
import { db } from "../../../lib/firebase";

export default function todoIndex() {
  const router = useRouter();
  const taskId = router.query.id;
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

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box className="big">
          <Box sx={{ textAlign: "right", marginLeft: "auto" }}>
            <Link href="/todos">
              <Button
                variant="contained"
                sx={{
                  pl: 4,
                  pr: 4,
                  mt: 3,
                  mb: 2,
                  mr: 5,
                  background: "#68D391",
                  "&:hover": {
                    background: "#68D391",
                    opacity: [0.9, 0.8, 0.7],
                  },
                  borderRadius: 25,
                  border: 1,
                  borderColor: "text.primary",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Back
              </Button>
            </Link>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              component="h1"
              variant="h4"
              mb={2}
              sx={{ fontWeight: "bold" }}
            >
              SHOW TODO
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: "flex", overflowX: "auto" }}>
              <Box sx={{ border: 1, borderRadius: 4, p: 2 }}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            background: "#68D391",
                          }}
                        >
                          TASK
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                          {task}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            background: "#68D391",
                          }}
                        >
                          DETAIL
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            height: "240px",
                            verticalAlign: "top",
                            wordBreak: "break-word",
                          }}
                        >
                          {detail}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ display: "flex" }}>
                  <Link href={`/todos/${taskId}/edit`}>
                    <Button
                      variant="contained"
                      sx={{
                        pl: 5,
                        mr: 10,
                        mt: 2,
                        mb: 2,
                        background: "#68D391",
                        "&:hover": {
                          background: "#68D391",
                          opacity: [0.9, 0.8, 0.7],
                        },
                        borderRadius: 25,
                        border: 1,
                        borderColor: "text.primary",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                        Edit
                      </Typography>
                      <Box component="span" sx={{ p: 2 }} />
                      <EditIcon />
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

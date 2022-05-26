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
import { doc, getDoc } from "firebase/firestore";

import { Header } from "../../../components/Header";
import { db } from "../../../lib/firebase";
import { dateFormat } from "../../../components/DateFormat";

export default function todoIndex() {
  const router = useRouter();
  const taskId: string =
    typeof router.query.id !== "object" &&
    typeof router.query.id !== "undefined"
      ? router.query.id
      : "";
  const [task, setTask] = useState("");
  const [detail, setDetail] = useState("");
  const [priority, setPriority] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    if (router.isReady) {
      const accessDb = async () => {
        try {
          const docRef = await doc(db, "todos", taskId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setTask(docSnap.get("task"));
            setDetail(docSnap.get("detail"));
            setPriority(docSnap.get("priority"));
            setCreatedAt(dateFormat(docSnap.get("createdAt")));
            setUpdatedAt(dateFormat(docSnap.get("updatedAt")));
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
                  <Box sx={{ mr: 10, mt: 1.5, mb: 2 }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                      Priority
                    </Typography>
                    <Typography sx={{ fontWeight: "bold", fontSize: 23 }}>
                      {priority}
                    </Typography>
                  </Box>
                  <Box sx={{ mr: 10, mt: 1.5, mb: 2 }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                      Create
                    </Typography>
                    <Typography sx={{ fontWeight: "bold", fontSize: 23 }}>
                      {createdAt}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, mb: 2 }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                      Update
                    </Typography>
                    <Typography sx={{ fontWeight: "bold", fontSize: 23 }}>
                      {updatedAt}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

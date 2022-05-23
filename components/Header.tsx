import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export const Header = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "80px",
          background: "#68D391",
        }}
      >
        <Typography
          component="h1"
          style={{ fontSize: "48px", marginLeft: "60px" }}
        >
          TODO
        </Typography>
      </Box>
    </>
  );
};

import React from "react";
import CountUp from "react-countup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Counter() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="white"
      py={4}
      gap={20}
    >
      <Box textAlign="center">
        <Typography variant="h3">
          <CountUp start={0} end={1000} duration={5.5} separator="," />+
        </Typography>
        <Typography variant="subtitle1" color="info">
          Videos Summarized
        </Typography>
      </Box>

      <Box textAlign="center">
        <Typography variant="h3">
          <CountUp start={0} end={5000} duration={5.5} separator="," />+
        </Typography>
        <Typography variant="subtitle1" color="info">
          Hours Saved
        </Typography>
      </Box>

      <Box textAlign="center">
        <Typography variant="h3">
          <CountUp start={0} end={500} duration={5.5} separator="," />+
        </Typography>
        <Typography variant="subtitle1" color="info">
          Viewers Helped
        </Typography>
      </Box>
    </Box>
  );
}

export default Counter;

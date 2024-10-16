import React, { useState } from "react";
import { Button, TextField, Paper, Typography, Box } from "@mui/material";

export default function Playground() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const executeCode = () => {
    let output = [];
    const originalLog = console.log;
    console.log = (...args) => {
      output.push(
        args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg) : String(arg)
          )
          .join(" ")
      );
    };

    try {
      const returnValue = eval(code);
      if (returnValue !== undefined) {
        output.push(String(returnValue));
      }
      setResult(output.join("\n"));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      console.log = originalLog;
    }
  };

  const clearFields = () => {
    setCode("");
    setResult("");
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <TextField
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your JavaScript code here"
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={executeCode}>
          Execute
        </Button>
        <Button variant="outlined" onClick={clearFields}>
          Clear
        </Button>
      </Box>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Result:
        </Typography>
        <Typography
          component="pre"
          sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {result}
        </Typography>
      </Paper>
    </Box>
  );
}

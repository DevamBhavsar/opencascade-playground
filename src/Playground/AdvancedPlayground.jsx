import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import React, { lazy, Suspense, useState } from "react";

const OpenCascadeComponent = lazy(() => import("./OpenCascadeComponent"));
const ThreeJSRenderer = lazy(() => import("./ThreeJSRenderer"));

export default function AdvancedPlayground() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [isOpenCascadeMode, setIsOpenCascadeMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shape, setShape] = useState(null);

  const executeCode = debounce(() => {
    setIsLoading(true);
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
      if (isOpenCascadeMode) {
        // OpenCascade.js code execution will be handled in the OpenCascadeComponent
        setShape(code);
      } else {
        // eslint-disable-next-line
        const returnValue = eval(code);
        if (returnValue !== undefined) {
          output.push(String(returnValue));
        }
      }
      setResult(output.join("\n"));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      console.log = originalLog;
      setIsLoading(false);
    }
  }, 500);

  const clearFields = () => {
    setCode("");
    setResult("");
    setShape(null);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <FormControlLabel
        control={
          <Switch
            checked={isOpenCascadeMode}
            onChange={(e) => setIsOpenCascadeMode(e.target.checked)}
          />
        }
        label="OpenCascade.js Mode"
      />
      <TextField
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={
          isOpenCascadeMode
            ? "Enter your OpenCascade.js code here"
            : "Enter your JavaScript code here"
        }
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={executeCode}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Execute"}
        </Button>
        <Button variant="outlined" onClick={clearFields} disabled={isLoading}>
          Clear
        </Button>
      </Box>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
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
      <Suspense fallback={<CircularProgress />}>
        {isOpenCascadeMode ? (
          <OpenCascadeComponent code={shape} setResult={setResult} />
        ) : (
          <ThreeJSRenderer shape={shape} />
        )}
      </Suspense>
    </Box>
  );
}

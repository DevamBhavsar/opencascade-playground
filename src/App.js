import { Box, Container, Typography } from "@mui/material";
import "./App.css";
import AdvancedPlayground from "./Playground/AdvancedPlayground";
// impoet AdvancedPlayground
function App() {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1">
          CAD Model Viewer
        </Typography>
        <AdvancedPlayground />
      </Box>
    </Container>
  );
}

export default App;

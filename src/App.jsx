import "./App.css";
import { Box, Button } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";

function App() {
  return (
    <>
      <Box minH={"100vh"} background={"#111"} color={"gray.500"} px={6} py={8}>
        <CodeEditor />

      </Box>
    </>
  );
}

export default App;

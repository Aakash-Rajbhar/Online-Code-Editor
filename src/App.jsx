import './App.css';
import { Box } from '@chakra-ui/react';
import CodeEditor from './components/CodeEditor';
import { useState } from 'react';

function App() {
  const [toggleTheme, setToggleTheme] = useState(false);

  const handleToggleTheme = () => {
    setToggleTheme(!toggleTheme);
  };
  return (
    <>
      <Box
        minH={'100vh'}
        background={!toggleTheme ? '#252525' : '#ffffff'}
        color={'gray.500'}
        px={6}
        py={8}
      >
        <CodeEditor
          handleToggleTheme={handleToggleTheme}
          toggleTheme={toggleTheme}
        />
      </Box>
    </>
  );
}

export default App;

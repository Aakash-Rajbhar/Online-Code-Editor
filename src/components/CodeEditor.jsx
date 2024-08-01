import { border, Box, HStack } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import Output from './Output';

const CodeEditor = ({ handleToggleTheme, toggleTheme }) => {
  const [value, setValue] = useState('');
  const [language, setlanguage] = useState('javascript');
  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setlanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box>
      <HStack spacing={4} flexDirection={{ base: 'column', md: 'row' }}>
        <Box width={{ base: '100%', md: '50%' }}>
          <LanguageSelector
            language={language}
            onSelect={onSelect}
            className="z-10 border-2 border-gray-500"
            handleToggleTheme={handleToggleTheme}
            toggleTheme={toggleTheme}
          />
          <Editor
            className="border-2 border-gray-500 rounded-md"
            height="75vh"
            theme={!toggleTheme ? 'vs-dark' : 'vs-light'}
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            value={value}
            onChange={(value) => setValue(value)}
            onMount={onMount}
            options={{
              padding: {
                top: 20,
                left: 10,
                right: 10,
                bottom: 20,
              },
              fontSize: 16,
              fontFamily: 'Cascadia Code',
              fontLigatures: true,
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </Box>
        <Output
          editorRef={editorRef}
          language={language}
          toggleTheme={toggleTheme}
        />
      </HStack>
    </Box>
  );
};

export default CodeEditor;

import { Box, HStack } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import Output from './Output';
import { FileCode2 } from 'lucide-react';

const CodeEditor = ({ handleToggleTheme, toggleTheme }) => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');
  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language] || '');
    1;
  };

  return (
    <Box>
      <HStack
        spacing={4}
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems={'flex-end'}
      >
        <Box width={{ base: '100%', md: '70%' }}>
          <LanguageSelector
            language={language}
            onSelect={onSelect}
            className="z-10 border-2 border-gray-500"
            handleToggleTheme={handleToggleTheme}
            toggleTheme={toggleTheme}
          />
          <div className="border-[1px] border-[#555555] rounded-lg p-2">
            <div
              className={`${
                !toggleTheme ? 'bg-[#252525] border-b-[#555555]' : 'bg-gray-100'
              }  border-b-2 `}
            >
              <h2
                className={`h-full flex gap-1 ${
                  !toggleTheme ? 'text-gray-100' : 'text-gray-500'
                } items-center py-2 px-2 text-2xl tracking-widest font-medium`}
              >
                <FileCode2
                  className={`w-8 h-8 ${
                    !toggleTheme ? 'text-gray-100' : 'text-gray-500'
                  }`}
                />
                Code Editor
              </h2>
            </div>
            <Editor
              height="75vh"
              theme={!toggleTheme ? 'vs-dark' : 'vs-light'}
              language={language}
              defaultValue={CODE_SNIPPETS[language] || ''}
              value={value}
              onChange={(value) => setValue(value || '')}
              onMount={onMount}
              options={{
                padding: { top: 20, left: 10, right: 10, bottom: 20 },
                fontSize: 16,
                fontFamily: 'Fira Code, Cascadia Code',
                fontLigatures: true,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
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
CodeEditor.propTypes = {
  handleToggleTheme: PropTypes.func.isRequired,
  toggleTheme: PropTypes.bool.isRequired,
};

export default CodeEditor;

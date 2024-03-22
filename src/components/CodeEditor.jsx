import { Box, HStack } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const [value, setValue] = useState("");
  const [language, setlanguage] = useState("javascript");
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
      <HStack spacing={4}>
        <Box w={"50%"}>
          <LanguageSelector
            language={language}
            onSelect={onSelect}
            className="z-10"
          />
          <Editor
            height="75vh"
            theme="vs-dark"
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
              wordWrap: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;

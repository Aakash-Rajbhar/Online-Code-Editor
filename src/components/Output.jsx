import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { executeCode } from "../api";
import { useToast } from "@chakra-ui/react";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useToast();
  const [inputValue, setInputValue] = useState("");

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);

      const { run: result } = await executeCode(
        language,
        sourceCode,
        inputValue
      );
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to execute the code.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w={"50%"} >
      <Button
        isLoading={isloading}
        onClick={runCode}
        variant={"outline"}
        mb={4}
        px={4}
        py={2}
        border={"1px solid"}
        borderRadius="md"
      >
        Run Code
      </Button>
      <Text mb={2} fontSize={"lg"}>
        Input:
      </Text>
      <Textarea
        height={"33vh"}
        width={"100%"}
        p={2}
        border={"1px solid"}
        borderColor={"gray.700"}
        borderRadius={4}
        color={"gray.500"}
        background={"#111"}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter input..."
        fontSize={"18px"}
      ></Textarea>

      <Text mb={2} fontSize={"lg"}>
        Output:
      </Text>

      <Box
        height={"33vh"}
        p={2}
        border={"1px solid"}
        color={isError ? "red.500" : "gray.500"}
        borderRadius={4}
        borderColor={isError ? "red.500" : "gray.700"}

        className="overflow-auto text-[18px]"
   
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : "Click 'Run Code' to execute the code."}
      </Box>
    </Box>
  );
};

export default Output;

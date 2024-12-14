import { Box, Button, Text, Textarea, useToast } from '@chakra-ui/react';
import { executeCode } from '../api';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  CheckCheck,
  ChevronsLeftRightEllipsis,
  CircleX,
  Play,
  SquareTerminal,
} from 'lucide-react';

const Output = ({ editorRef, language, toggleTheme }) => {
  const [output, setOutput] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useToast();
  const [inputValue, setInputValue] = useState('');

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
      setOutput(result.output.split('\n'));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error.message || 'Unable to execute the code.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      w={{ base: '100%', md: '50%' }}
      className="flex flex-col gap-4 justify-center "
    >
      <Button
        isLoading={isloading}
        height={'45px'}
        margin={'start'}
        onClick={runCode}
        variant={'outline'}
        mb={4}
        px={2}
        py={2}
        maxWidth={'fit-content'}
        border={'2px solid #555'}
        borderRadius="md"
        transition={'all 0.2s ease-in-out'}
        _hover={{ outline: '1px solid' }}
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Play width={20} height={20} />
        Run Code
      </Button>

      <div className="border-[1px] border-gray-500 rounded-b-xl p-2">
        <Text
          mb={2}
          fontSize={'xl'}
          className="flex items-center gap-2 border-b-2 py-2 border-b-gray-500"
        >
          <ChevronsLeftRightEllipsis /> Input:
        </Text>

        <Textarea
          minHeight={'22.5vh'}
          width={'100%'}
          p={2}
          outline={'none'}
          color={!toggleTheme ? 'gray.500' : 'gray.700'}
          background={!toggleTheme ? '#111' : 'white'}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter input..."
          fontSize={'18px'}
          resize={'none'}
        ></Textarea>
      </div>

      <div className="border-[1px] border-gray-500 rounded-b-xl p-2">
        <Text
          mb={2}
          fontSize={'xl'}
          className="flex items-center gap-2 border-b-2 py-2 border-b-gray-500"
        >
          <SquareTerminal />
          Output:{' '}
          {output ? (
            isError ? (
              <Text className="flex gap-1 items-center" color={'red'}>
                <CircleX width={20} hei color="#f00000" />
                Failed to execute!
              </Text>
            ) : (
              <Text color={'green'} className="flex gap-1 items-center">
                <CheckCheck color="#008000" width={24} height={24} />
                Executed Successfully!
              </Text>
            )
          ) : null}
        </Text>

        <Box
          height={'40vh'}
          overflowY={'auto'}
          p={2}
          color={
            output && isError
              ? 'red.500'
              : !toggleTheme
              ? 'gray.500'
              : 'gray.700'
          }
          background={!toggleTheme ? '#111' : 'white'}
          borderRadius={4}
          borderColor={isError ? 'red.500' : 'gray.500'}
          className="overflow-auto text-[18px]"
        >
          {output
            ? output.map((line, i) => <Text key={i}>{line}</Text>)
            : "Click 'Run Code' to execute the code."}
        </Box>
      </div>
    </Box>
  );
};
Output.propTypes = {
  editorRef: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  toggleTheme: PropTypes.bool.isRequired,
};

export default Output;

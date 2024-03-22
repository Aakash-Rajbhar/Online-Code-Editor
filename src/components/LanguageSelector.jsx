import {Box, Button, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../constants";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const Language = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({
  language,
  onSelect,
  handleToggleTheme,
  toggleTheme,
}) => {
  return (
    <Box ml={2} mb={4}>
      <Text mb={2} fontSize={"large"}>
        Language:
      </Text>

      <Menu isLazy zIndex="10">
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          px={4}
          py={2}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          borderColor={!toggleTheme ? "gray.600" : "gray.900"}
          mb={4}
        >
          {language}
        </MenuButton>
        <MenuList
          px={4}
          py={4}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          background={!toggleTheme ? "#111" : "#fff"}
          zIndex={"10"}
        >
          {Language.map(([lang, version]) => (
            <MenuItem
              key={lang}
              onClick={() => onSelect(lang)}
              color={lang === language ? "blue.400" : ""}
              px={4}
              py={2}
              borderRadius="md"
              _hover={{ background: !toggleTheme ? "gray.900" : "gray.100" }}
            >
              {lang} &ndash; {version}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {!toggleTheme ? (
        <SunIcon
          ml={4}
          mb={4}
          boxSize={6}
          className="cursor-pointer"
          onClick={handleToggleTheme}
        />
      ) : (
        <MoonIcon
          ml={4}
          mb={4}
          boxSize={6}
          className="cursor-pointer"
          onClick={handleToggleTheme}
        />
      )}
    </Box>
  );
};

export default LanguageSelector;

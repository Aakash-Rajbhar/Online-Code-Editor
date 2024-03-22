import { Box, Button, Text } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../constants";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Language = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
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
          background={"#111"}
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
              _hover={{ background: "gray.900" }}
            >
              {lang} &ndash; {version}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;

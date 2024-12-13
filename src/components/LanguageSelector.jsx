import {
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { LANGUAGES } from '../constants';

const LanguageSelector = ({
  language,
  onSelect,
  handleToggleTheme,
  toggleTheme,
}) => {
  return (
    <Box ml={2} mb={4} className="flex gap-3 items-center">
      <Text mb={2} fontSize={'large'}>
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
          borderColor={'gray.500'}
          mb={4}
        >
          {language}
        </MenuButton>
        <MenuList
          px={3}
          py={4}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="2px"
          borderColor={!toggleTheme ? '' : 'gray.300'}
          background={!toggleTheme ? '#111' : '#fafafa'}
          zIndex={'10'}
        >
          {LANGUAGES.map(([name, version, logo]) => (
            <MenuItem
              key={name}
              onClick={() => onSelect(name)}
              color={name === language ? 'blue.400' : ''}
              px={4}
              py={2}
              borderRadius="md"
              _hover={{ background: !toggleTheme ? 'gray.900' : 'gray.100' }}
            >
              <img
                src={logo}
                alt="logo"
                width={20}
                height={20}
                className="mr-3"
              />
              {name} &ndash; {version}
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
LanguageSelector.propTypes = {
  language: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  handleToggleTheme: PropTypes.func.isRequired,
  toggleTheme: PropTypes.bool.isRequired,
};

export default LanguageSelector;

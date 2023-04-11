import React from 'react';
import css from '../css/search.css';
import { Input, InputLeftAddon, InputGroup} from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { BookList } from '../components';
export const Search = () => {
    return (
        <> 
            <header>Books 4 Less</header>
            <InputGroup>
                <InputLeftAddon children='Title' />
                <Input class='searchBar' variant='filled' placeholder='Filled'/>
            </InputGroup>
            <BookList />
        </>
    );
}
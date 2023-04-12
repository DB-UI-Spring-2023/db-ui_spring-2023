import React from 'react';
import css from '../css/search.css';
import { Input, InputLeftAddon, InputGroup} from '@chakra-ui/react'
import { Box} from '@chakra-ui/react'

import { BookList } from '../components';


export const Search = () => {
    return (
        <>
            <InputGroup>
                <InputLeftAddon children='Title' />
                <Input class='searchBar' variant='filled' placeholder='Filled'/>
            </InputGroup>
        </>
    );
}
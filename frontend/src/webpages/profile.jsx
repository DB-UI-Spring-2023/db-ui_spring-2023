import css from '../css/profile.css';
import React from 'react';
import { Button, Heading } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
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


export const Profile = () => {
    return (
        <>
        <Heading mt= '2rem' as='h1' size='2xl' textAlign='center'>My Account</Heading>
        <div class="menuContain">
            <Menu>
                <MenuButton mt='1rem'  as={Button} colorScheme='gray' 
                height='48px'
                width='200px'
                border='2px'
                borderColor='teal'
                borderRadius='10px'
                position='relative'
                >
                Profile
                </MenuButton>
                <MenuList mt='2rem'>
                    <MenuGroup title='My Account'>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem>Payments </MenuItem>
                        <MenuItem>My Listings</MenuItem>
                        <MenuItem>My Purchases</MenuItem>
                        <MenuItem>My Reviews</MenuItem>
                        <MenuItem>My Messages</MenuItem>
                    </MenuGroup>
                <MenuDivider />
                <MenuGroup title='Account'>
                    <MenuItem>Logout</MenuItem>
                </MenuGroup>
                <MenuGroup title='Help'>
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                </MenuGroup>
                </MenuList>
            </Menu>
                <Image mt='.5rem' borderRadius='full' boxSize='150px'src='https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.webp' alt='default pic' />
        </div>
        <div class="profileInfo">
            <h2>Temp #Username</h2>
            <h4>Temp #Rating</h4>
            <h5>Temp #Reviews</h5>
        </div>
        </>
        
    )
};

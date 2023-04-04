import React from 'react';
import { Button, Heading } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
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

export const navBar = () => {
    return (
        <>
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
                    Home
                    </MenuButton>
                    <MenuList mt='2rem'>
                        <MenuGroup title='Setting'>
                            <MenuItem>My Account</MenuItem>
                            <MenuItem>My Payments </MenuItem>
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
            </div>
            <div class="avatarBadge">
                <Flex>
                    <Avatar src='https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.webp' />
                    <Box ml='3'>
                        <Text fontWeight='bold'>
                            Username
                            <Badge ml='1' colorScheme='green'>
                            New
                            </Badge>
                        </Text>
                        <Text fontSize='sm'>UI Engineer</Text>
                    </Box>
                </Flex>
            </div>
        </>
    )
};

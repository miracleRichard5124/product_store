import { Button, Container, Flex, HStack, Text, Icon } from '@chakra-ui/react'
import React from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { useColorMode } from './ui/color-mode'
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'

const Navbar = () => {
    const location = useLocation();
    const isCreatePage = location.pathname === '/create';

    const { colorMode, toggleColorMode } = useColorMode();


    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row"
                }}
            >

                <Text
                    as={Link}
                    to="/"
                    fontSize={{ base: "22px", sm: "28px" }}
                    fontWeight="bold"
                    textTransform="uppercase"
                    textAlign="center"
                    bg="linear-gradient(to right, #06b6d4, #3b82f6)"
                    bgClip="text"
                    color="transparent"
                >
                    Product Store 🛒
                </Text>

                <HStack spacing={2} alignItems={'center'}>
                    {!isCreatePage && (
                        <Link to={"/create"}>
                            <Button>
                                <Icon as={FiPlusSquare} boxSize={6} />
                            </Button>
                        </Link>
                    )}
                    <Button onClick={toggleColorMode}>{colorMode === "light" ? <IoMoon /> : <LuSun />}</Button>
                </HStack>
            </Flex>
        </Container>
    )
}

export default Navbar
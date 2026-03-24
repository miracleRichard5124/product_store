import { Button, Container, Flex, HStack, Text, Icon } from '@chakra-ui/react'
import React from 'react'
import { FiPlusSquare, FiHome } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { useColorMode } from './ui/color-mode'
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'

const Navbar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isCreatePage = location.pathname === '/create';

    const { colorMode, toggleColorMode } = useColorMode();


    return (
        <Container maxW={"1140px"} px={4} mb={{ base: 4, md: 6 }}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row"
                }}
                gap={'20px'}
                pt={'15px'}
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
                    <Link to={isCreatePage ? "/" : "/create"}>
                        <Button
                            variant={isCreatePage ? "solid" : "outline"}
                            colorPalette={isCreatePage ? "green" : "blue"}
                        >
                            <Icon as={isCreatePage ? FiHome : FiPlusSquare} boxSize={6} />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>{colorMode === "light" ? <IoMoon /> : <LuSun />}</Button>
                </HStack>
            </Flex>
        </Container>
    )
}

export default Navbar
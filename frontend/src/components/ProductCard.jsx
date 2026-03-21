import { Box, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { toaster } from './ui/toaster';
import { useColorModeValue } from './ui/color-mode';
import { Pencil, Trash2 } from 'lucide-react';
import { useProductStore } from '@/store/product';

const ProductCard = ({ product, onEdit }) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct } = useProductStore();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        toaster.create({
            title: success ? "Success" : "Error",
            description: message,
            type: success ? 'success' : "error",
            duration: 3000,
            closable: true
        });
    };

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-6px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h="200px" w="full" objectFit="cover" />

            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight="bold" fontSize='xl' color={textColor} mb={4}>
                    $ {product.price}
                </Text>

                <HStack gap={2}>
                    <IconButton
                        aria-label='Edit Product'
                        colorPalette="blue"
                        onClick={() => onEdit(product)}
                    >
                        <Pencil size={18} />
                    </IconButton>

                    <IconButton
                        aria-label='Delete Product'
                        colorPalette="red"
                        onClick={() => handleDeleteProduct(product._id)}
                    >
                        <Trash2 size={18} />
                    </IconButton>
                </HStack>
            </Box>
        </Box>
    );
};

export default ProductCard;
import { Box, Heading, HStack, IconButton, Image, Text, Button, Dialog } from '@chakra-ui/react';
import React, { useState } from 'react';
import { toaster } from './ui/toaster';
import { useColorModeValue } from './ui/color-mode';
import { Pencil, Trash2 } from 'lucide-react';
import { useProductStore } from '@/store/product';

const ProductCard = ({ product, onEdit }) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const [openDelete, setOpenDelete] = useState(false);

    const { deleteProduct, isDeleting } = useProductStore();

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
                        onClick={() => setOpenDelete(true)}
                    >
                        <Trash2 size={18} />
                    </IconButton>
                </HStack>
            </Box>

            <Dialog.Root open={openDelete} onOpenChange={(e) => setOpenDelete(e.open)}>
                <Dialog.Backdrop />

                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Delete Product</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Button
                                colorPalette="red"
                                onClick={async () => {
                                    const { success, message } = await deleteProduct(product._id);

                                    toaster.create({
                                        title: success ? "Success" : "Error",
                                        description: message,
                                        type: success ? "success" : "error",
                                        duration: 3000,
                                        closable: true
                                    });

                                    if (success) setOpenDelete(false);
                                }}
                                isLoading={isDeleting}
                            >
                                Delete
                            </Button>

                            <Button variant="ghost" onClick={() => setOpenDelete(false)}>
                                Cancel
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>
        </Box>
    );
};

export default ProductCard;
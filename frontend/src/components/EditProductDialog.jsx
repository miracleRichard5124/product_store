import { useProductStore } from '@/store/product';
import { Button, Dialog, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const EditProductDialog = ({ product, open, onClose }) => {
    const [updatedProduct, setUpdatedProduct] = useState({
        name: '',
        price: '',
        image: ''
    });

    const { updateProduct } = useProductStore();

    useEffect(() => {
        if (product) {
            setUpdatedProduct({
                name: product.name,
                price: product.price,
                image: product.image
            });
        }
    }, [product]);

    const handleUpdateProduct = async () => {
        const { success } = await updateProduct(product._id, updatedProduct);
        if (success) {
            onClose();
        }
    };

    if (!product) return null;

    return (
        <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
            <Dialog.Backdrop />

            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Update Product</Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                        <VStack gap={4}>
                            <Input
                                placeholder='Product name'
                                value={updatedProduct.name}
                                onChange={(e) =>
                                    setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                                }
                            />
                            <Input
                                placeholder='Price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) =>
                                    setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                                }
                            />
                            <Input
                                placeholder='Image URL'
                                value={updatedProduct.image}
                                onChange={(e) =>
                                    setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                                }
                            />
                        </VStack>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Button colorPalette='blue' mr={3} onClick={handleUpdateProduct}>
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};

export default EditProductDialog;
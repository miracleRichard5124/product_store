import { useProductStore } from '@/store/product';
import { Button, Dialog, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { toaster } from './ui/toaster';

const EditProductDialog = ({ product, open, onClose }) => {
    const [updatedProduct, setUpdatedProduct] = useState({
        name: '',
        price: '',
        image: ''
    });

    const { updateProduct, isUpdating } = useProductStore();
    const [originalProduct, setOriginalProduct] = useState(null);

    const isDirty =
        originalProduct &&
        (
            updatedProduct.name !== originalProduct.name ||
            updatedProduct.price !== originalProduct.price ||
            updatedProduct.image !== originalProduct.image
        );

    const getButtonText = (loading, normal) =>
        loading ? `${normal}...` : normal;



    useEffect(() => {
        if (product) {
            const formatted = ({
                name: product.name,
                price: product.price,
                image: product.image
            });
            setUpdatedProduct(formatted);
            setOriginalProduct(formatted);
        }
    }, [product]);

    const handleUpdateProduct = async () => {
        const { success, message } = await updateProduct(product._id, updatedProduct);

        toaster.create({
            title: success ? "Success" : "Error",
            description: message,
            type: success ? "success" : "error",
            duration: 3000,
            closable: true
        });

        if (success) {
            onClose();
        }
    };

    if (!product) return null;

    return (
        <Dialog.Root open={open} onOpenChange={(e) => {
            if (!e.open && !isUpdating) onClose();
        }}>
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
                                isDisabled={isUpdating}
                                onChange={(e) =>
                                    setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                                }
                            />
                            <Input
                                placeholder='Price'
                                type='number'
                                value={updatedProduct.price}
                                isDisabled={isUpdating}
                                onChange={(e) =>
                                    setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                                }
                            />
                            <Input
                                placeholder='Image URL'
                                value={updatedProduct.image}
                                isDisabled={isUpdating}
                                onChange={(e) =>
                                    setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                                }
                            />
                        </VStack>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Button loading={isUpdating} mr={3} colorPalette="blue" disabled={!isDirty || isUpdating} opacity={!isDirty ? 0.5 : 1}
                            cursor={!isDirty ? "not-allowed" : "pointer"} onClick={handleUpdateProduct}>
                            {getButtonText(isUpdating, "Update")}
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
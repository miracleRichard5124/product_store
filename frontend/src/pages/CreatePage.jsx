import { useColorModeValue } from '@/components/ui/color-mode';
import { toaster } from '@/components/ui/toaster';
import { useProductStore } from '@/store/product';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct, isCreating } = useProductStore()

  const getButtonText = (loading, normal) =>
    loading ? `${normal}...` : normal;

  const handleAddProduct = async () => {
    if (isCreating) return;

    const { success, message } = await createProduct(newProduct)
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
    })

    if (success) {
      setNewProduct({
        name: "",
        price: "",
        image: ""
      })
    }
  }


  return (
    <Container maxW={"lg"}>
      <VStack gap={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create A New Product</Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} mx={"auto"} rounded={"lg"} shadow={"md"}>
          <VStack gap={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              isDisabled={isCreating}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />

            <Input
              placeholder='Price'
              name='price'
              value={newProduct.price}
              isDisabled={isCreating}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            />

            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              isDisabled={isCreating}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Button loading={isCreating} w="full" colorPalette="blue" onClick={handleAddProduct}>
              {getButtonText(isCreating, "Add Product")}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage
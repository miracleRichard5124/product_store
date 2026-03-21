import ProductCard from '@/components/ProductCard';
import EditProductDialog from '@/components/EditProductDialog';
import { useProductStore } from '@/store/product';
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack gap={8}>
        <Text
          fontSize="20px"
          fontWeight="bold"
          textAlign="center"
          bg="linear-gradient(to right, #06b6d4, #3b82f6)"
          bgClip="text"
          color="transparent"
        >
          Current Products 🚀
        </Text>

        {products.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10} w="full">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={(product) => {
                  setSelectedProduct(product);
                  setOpen(true);
                }}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
            No products found 😥{" "}
            <Text
              as={Link}
              to="/create"
              color="blue.500"
              _hover={{ textDecoration: 'underline' }}
            >
              Create a product
            </Text>
          </Text>
        )}

        {/* ✅ SINGLE GLOBAL DIALOG */}
        <EditProductDialog
          product={selectedProduct}
          open={open}
          onClose={() => setOpen(false)}
        />
      </VStack>
    </Container>
  );
};

export default HomePage;
import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],

    isFetching: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,

    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill all fields" };
        }

        set({ isCreating: true });

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data?.message || "Something went wrong" };
            }

            set((state) => ({
                products: [...state.products, data.data]
            }));

            return { success: true, message: "Product created successfully" };

        } catch (error) {
            return { success: false, message: "Network error" };
        } finally {
            set({ isCreating: false });
        }
    },

    fetchProducts: async () => {
        set({ isFetching: true });

        try {
            const res = await fetch("/api/products");
            const data = await res.json();

            if (!res.ok) {
                console.error(data.message || "Failed to fetch products");
                return;
            }

            set({ products: data?.data || [] });

        } catch (error) {
            console.error("Fetch error:", error.message);
        } finally {
            set({ isFetching: false });
        }
    },

    deleteProduct: async (pid) => {
        set({ isDeleting: true });

        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!data.success) {
                return { success: false, message: data.message };
            }

            set((state) => ({
                products: state.products.filter(product => product._id !== pid)
            }));

            return { success: true, message: data.message };

        } catch (error) {
            return { success: false, message: "Delete failed" };
        } finally {
            set({ isDeleting: false });
        }
    },

    updateProduct: async (pid, updatedProduct) => {
        set({ isUpdating: true });

        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            const data = await res.json();

            if (!data.success) {
                return { success: false, message: data.message };
            }

            set((state) => ({
                products: state.products.map((product) =>
                    product._id === pid ? data.data : product
                )
            }));

            return {
                success: true,
                message: data.message || "Product updated successfully"
            };

        } catch (error) {
            return { success: false, message: "Update failed" };
        } finally {
            set({ isUpdating: false });
        }
    }
}));
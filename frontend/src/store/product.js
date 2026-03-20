import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill all fields" }
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })

        let data = null;

        try {
            data = await res.json()

        } catch {
            return { success: false, message: "Invalid server response" }
        }

        if (!res.ok) {
            return { success: false, message: data?.message || "something went wrong" }
        }

        set((state) => ({ products: [...state.products, data.data] }))
        return { success: true, message: "Product created successfully" }
    }
}))
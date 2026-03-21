import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill all fields" };
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        let data = null;

        try {
            data = await res.json();
        } catch {
            return { success: false, message: "Invalid server response" };
        }

        if (!res.ok) {
            return { success: false, message: data?.message || "something went wrong" };
        }

        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
    },
    fetchProducts: async() => {
        const res = await fetch("/api/products");
        let data = null;
        try{
            data = await res.json();
        }catch{
            console.error("Invalid JSON response");
            return
        }
        if(!res.ok){
            console.error(data.message || "Failed to fetch products");
            return
        }
        set({ products: data?.data || [] });
    },
    deleteProduct: async(pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success){
            return {success: false, message: data.message};
        }
        set(state => ({products: state.products.filter(product => product._id !== pid)}));
        return {success: true, message: data.message};
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message}
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product))
        }))
        return {success: true, message: data.message}
    }
}))
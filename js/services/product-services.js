const BASE_URL = "http://localhost:3001/products";

const getProducts = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al listar productos",error);
    }
};



const createProduct = async (name,price,image) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name,price,image}),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al crear producto",error);
    }
};


async function deleteProduct(id) {
    const url = `${BASE_URL}/${id}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al eliminar producto",error);
    }
}


export const servicesProducts = {
    getProducts,createProduct,deleteProduct
};
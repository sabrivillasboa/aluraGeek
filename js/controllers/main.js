import { servicesProducts } from "../services/product-services.js";

const productsContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


//FUNCION PARA CREAR UNA CARD
function createCard({id,name,price,image}) {
    const card= document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div class="card__img-container">
        <img class="card__img" src="${image}" alt="">
    </div>
    <div class="card__description">
        <p class="card__name">${name}</p>
        <div class="card__price-container">
            <p>$${price}</p>
            <button class="delete" data-id="${id}">
                <img src="./image/icon _trash 2_.png" alt="">
            </button>
        </div>
    </div>
    `;

//EVENTO PARA ELIMINAR PRODUCTO

    const deleteButton = card.querySelector(".delete");
    deleteButton.addEventListener("click", async () => {    
        const productId = deleteButton.getAttribute("data-id");
        try {
            const isDeleted = await servicesProducts.deleteProduct(productId);
            if (isDeleted) {
                card.remove();
                alert(`Producto "${name}" eliminado correctamente.`);
            } else {
                alert(`No se pudo eliminar el producto"${name}"`);
            }
        } catch (error) {
            console.log('Error al intentar eliminar producto:', error);
        }
    });

    return card;
};


//FUNCION PARA MOSTRAR PRODUCTOS
const renderProducts = async () => {
    try {
        const listProducts = await servicesProducts.getProducts();
        listProducts.forEach( product => {
            const productCard = createCard(product);
            productsContainer.appendChild(productCard);
        });

    } catch (error) {
        console.log("Error al mostrar productos",error);
    }
};


//EVENTO PARA CREAR PRODUCTO NUEVO

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = event.target["name"].value;
    const price = event.target["price"].value;
    const image = event.target["image"].value;
    
    try {
        const newProduct = await servicesProducts.createProduct(name,price,image);
        const newCard = createCard(newProduct);
        productsContainer.appendChild(newCard);
    } catch (error) {
        console.log("Ha ocurrido un error al crear el producto",error);
    }
    form.reset();
});



renderProducts();
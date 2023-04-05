import { getShoppingCart } from "../utilities/fakedb";

const orderDataFromCart = async () => {
const productData = await fetch('products.json')
const storeProduct = await productData.json();
const storeCart = getShoppingCart();
const savedCart = [];
for(const id in storeCart){
    const addedCart = storeProduct.find(product => product.id === id);
    if(addedCart){
        const quantityValue =storeCart[id];
        addedCart.quantity = quantityValue;
        savedCart.push(addedCart)
    }
}
return savedCart;
}


export default orderDataFromCart
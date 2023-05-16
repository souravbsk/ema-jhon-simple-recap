import { getShoppingCart } from "../utilities/fakedb";

const orderDataFromCart = async () => {
    const storeCart =  getShoppingCart();
    const ids = Object.keys(storeCart);
const productData = await fetch('https://ema-jhon-simple-server-recap.vercel.app/productById',{
    method:"POST",
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify(ids)

})
const storeProduct = await productData.json();
const savedCart = [];
for(const id in storeCart){
    const addedCart = storeProduct.find(product => product._id === id);
    if(addedCart){
        const quantityValue =storeCart[id];
        addedCart.quantity = quantityValue;
        savedCart.push(addedCart)
    }
}
return savedCart;
}


export default orderDataFromCart
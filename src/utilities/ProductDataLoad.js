import { useEffect, useState } from "react"

const ProductDataLoad = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=> {
        fetch('https://ema-jhon-simple-server-recap.vercel.app/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    return [products,setProducts];
}

export default ProductDataLoad;
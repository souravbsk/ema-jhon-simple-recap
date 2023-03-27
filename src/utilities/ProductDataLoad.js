import { useEffect, useState } from "react"

const ProductDataLoad = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=> {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    return [products,setProducts];
}

export default ProductDataLoad;
import ProductDataLoad from "./ProductDataLoad";

const ProductDetailsDataLoad = async ({params}) => {
const productId  = await params.productId;




return productId
}

export default ProductDetailsDataLoad;
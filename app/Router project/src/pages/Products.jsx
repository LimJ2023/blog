import { Link } from "react-router-dom";
const PRODUCT = [
    { id: "p1", title: "Product 1" },
    { id: "p2", title: "Product 2" },
    { id: "p3", title: "Product 3" },
];
function ProductsPage() {
    return (
        <>
            <h1>Products</h1>;
            <ul>
                {PRODUCT.map((prod) => (
                    <li key={prod.id}>
                        {/* <Link to={`/products/${prod.id}`}>{prod.id}</Link> */}
                        <Link to={prod.id}>{prod.id}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ProductsPage;

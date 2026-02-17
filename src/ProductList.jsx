import {useSuspenseQuery} from "@tanstack/react-query";
import {fetchProducts} from "./api.js";
import {Product} from "./Product.jsx";

export function ProductList({onAddToCart}) {
    const {data: products} = useSuspenseQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    })


    return (
        <>
            <h2>Products</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                {products.map(product => (
                    <Product
                        key={product.id}
                        info={product}

                        // 2. SAMO JE PROSLEĐUJEMO DALJE (Kao vruć krompir)
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </>
    )
}
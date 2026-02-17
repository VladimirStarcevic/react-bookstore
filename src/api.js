export async function fetchProducts() {
    const response = await fetch('https://dummyjson.com/products');
    if(!response.ok) {
        throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
}

export async function postOrder(orderData) {
    const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: `Order for ${orderData.name}`,
            description: `Address: ${orderData.address}`,
            userId: 5,
        })
    })

    if (!response.ok) {
        throw new Error('Failed to place order');
    }

    return response.json();
}
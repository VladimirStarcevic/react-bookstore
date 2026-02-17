export function Product({info, onAddToCart}) {
    // 1. Gde je 'info'? Stići će kasnije od roditelja.
    // 2. DummyJSON koristi 'thumbnail', ne 'image'.
    const {title, price, thumbnail} = info;



    return (
        <div>
            <img src={thumbnail} alt={title}/>
            <h3>{title}</h3>
            <p>${price}</p>
            <button onClick={() => onAddToCart(info)}>Add to cart</button>
        </div>
    )

}
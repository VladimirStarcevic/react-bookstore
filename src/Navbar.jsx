export function Navbar({cartCount, onOpenCart}) {

    return (
        <nav style={{display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#333', color: 'whitesmoke'}}>
            <h1>My Store</h1>
            <button style={{cursor: 'pointer'}} onClick={onOpenCart}>
                🛒 Cart ({cartCount})
            </button>
        </nav>
    )
}
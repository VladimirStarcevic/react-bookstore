import './Cart.css'
import {useState} from 'react'
import {useMutation} from "@tanstack/react-query";
import {postOrder} from "./api"; // Proveri da li je putanja ./api ili ./api.js (zavisi od editora, ali ./api je ok)

export function Cart({ cartItems, onRemoveFromCart, onClose}) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const mutation = useMutation({
        mutationFn: postOrder,
        onSuccess: (data) => {
            setIsSuccess(true);
            console.log("Order placed successfully! Order ID: ", data.id);
        },
        onError: (error) => alert(`Failed to place order: ${error.message}`)
    })

    function handleOrder() {
        mutation.mutate({name, address});
    }

    return (
        <div className="cart-overlay">
            <div className="cart-modal">

                {/* --- ZAGLAVLJE (Uvek vidljivo) --- */}
                <div className="cart-header">
                    <h2>Your Cart ({cartItems.length})</h2>
                    <button onClick={onClose} className="close-btn">
                        &times;
                    </button>
                </div>

                {/* --- LISTA PROIZVODA (Uvek vidljiva - da vidiš šta si kupio) --- */}
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p style={{textAlign: 'center', color: '#888'}}>Your cart is empty.</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div>
                                    <strong>{item.title}</strong>
                                    <br/>
                                    <small>${item.price}</small>
                                </div>
                                <button
                                    onClick={() => onRemoveFromCart(item.id)}
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* --- SEMAFOR --- */}
                {isSuccess ? (
                    // 1. ZELENO SVETLO (Uspeh)
                    <div style={{ padding: '20px', textAlign: 'center', color: 'green', borderTop: '2px solid #ddd' }}>
                        <h3 style={{ fontSize: '2rem', margin: '10px 0' }}>🎉</h3>
                        <h3>Order Successful!</h3>
                        <p>Thank you, {name}.</p>
                        <p style={{fontSize: '0.9rem', color: '#666'}}>We are shipping to: {address}</p>

                        <button
                            onClick={onClose}
                            style={{
                                marginTop: '15px',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                backgroundColor: 'green',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                fontSize: '1rem'
                            }}
                        >
                            Close Cart
                        </button>
                    </div>
                ) : (
                    // 2. CRVENO SVETLO (Forma + Total)
                    // Ovde koristimo <> (Fragment) da grupišemo Formu i Total zajedno
                    <>
                        <div style={{ padding: '15px', background: '#f9f9f9', borderTop: '2px solid #ddd' }}>
                            <h3>Checkout Details</h3>
                            <div style={{marginBottom: '10px'}}>
                                <label style={{display: 'block', marginBottom: '5px'}}>Full Name:</label>
                                <input type="text"
                                       value={name}
                                       style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
                                       placeholder="Enter your name"
                                       onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div style={{marginBottom: '10px'}}>
                                <label style={{display: 'block', marginBottom: '5px'}}>Address:</label>
                                <input type="text"
                                       value={address}
                                       style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
                                       placeholder="Enter your address"
                                       onChange={e => setAddress(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={handleOrder}
                                disabled={mutation.isPending}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: mutation.isPending ? '#ccc' : '#555',
                                    color: 'white',
                                    cursor: mutation.isPending ? 'not-allowed' : 'pointer',
                                    border: 'none',
                                    marginTop: '10px'
                                }}
                            >
                                {mutation.isPending ? 'Processing...' : 'ORDER NOW'}
                            </button>
                        </div>

                        {/* Total je sada OVDE, unutar "else" bloka.
                            Znači, kad je uspeh, i on nestaje. */}
                        <div style={{marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '10px'}}>
                            <strong>Total: $...</strong>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
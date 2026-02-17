
export default function Fallback({ error}) {
    return (
        <div role="alert">
            <p>Something is wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
        </div>
    )
}
import { Link } from "react-router-dom";

function Principal() {
    return (
        <div>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Registrar</Link>
        </div>
    )
}

export default Principal;
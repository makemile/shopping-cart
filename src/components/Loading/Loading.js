import { Spinner } from "react-bootstrap";


const Loading =() => {
    return (
        <div className="loading">
            <Spinner animation="border" role="status"/>
            <h5>cargando</h5>

        </div>

    )
}

export default Loading;
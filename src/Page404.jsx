import { Link } from "react-router-dom";
import "./App.css";

function Page404() {
    return(
        <div className="not-found">
        <h1>PAGE NOT FOUND</h1>
        <Link to = "/">Go to Home Page</Link>
        </div>
    )
}

export default Page404;
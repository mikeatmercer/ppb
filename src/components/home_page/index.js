import {h} from "preact";
import {Link} from "react-router-dom";

export default function() {
    return <div>
        This is the homepage <br/>
        <Link to="/profile">Link to profile </Link>
    </div>
}
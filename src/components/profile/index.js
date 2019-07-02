import {Link} from "react-router-dom";
import {Component} from "preact";
import BlankContainer from "../testContainer.js";
import {Subscribe} from "unstated";

class P extends Component {
    render({blank}) {
        return <div>
        This is profile <br/>
        {blank.state.text}<br/>
        <Link to="/">Link to homepage</Link>
    </div>


    }
}


export default function() {
    return <Subscribe to={[BlankContainer]}>
    {blank =>(
        <P blank={blank} />
    )}
</Subscribe>

}
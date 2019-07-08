import { h, Component, render } from "preact";
import {Subscribe} from "unstated";
import ContentContainer from "../../containers/ContentContainer";

function strip(html){
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
 }

export default class TopicSelector extends Component {
    render(props,state) {
        return (
            <Subscribe to={[ContentContainer]}>
                {function(content){
                    let countries = content.state.countryOptions.map(e => <option value={e}>{e}</option>);
                    let docList = content.state.documents.map(e => <li>{strip(e.PolicyName)}</li>);
                    let topicOptions = content.state.topicOptions.map(e => <option value={e}>{e}</option>);
                    return (
                    <div>
                        <select disabled={content.state.loading} onChange={(e) => (content.updateCountry(e.target.value))}value={content.state.selectedCountry}>{countries}</select> <br/>{content.state.selectedCountry}
                        <ul>
                        {docList}
                        </ul>
                        <select>{topicOptions}</select>
                    </div>)
                }}
            </Subscribe>
        )
    }
}
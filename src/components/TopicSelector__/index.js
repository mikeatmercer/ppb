import { h, Component, render } from "preact";
import {Subscribe} from "unstated";
import ContentContainer from "../../containers/ContentContainer";

function strip(html){
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
 }
 function itemContent(e) {
    let topics = e.Topic.results.map(e => e.Title);

    return <span>{strip(e.PolicyName)}<br/>{topics.join(",")}</span>
 }

export default class TopicSelector extends Component {
    render(props,state) {
        return (
            <Subscribe to={[ContentContainer]}>
                {function(content){

                    let documents = content.state.documents.slice(10);
                    let countries = content.state.countryOptions.map(e => <option value={e}>{e}</option>);
                    let docList = documents.map(e => <li>{itemContent(e)}</li>);
                    let topicOptions = content.state.topicOptions.map(e => <option value={e}>{e}</option>);
                    let additionalPage = ( documents.length % 10 > 0) ? 1 : 0;
                    return (
                    <div> 
                        
                        <div>{(Math.floor(documents.length / 10)) + additionalPage}</div>
                        <div>Page: {content.state.page}</div>
                        <div onClick={(e)=> (content.updatePage(content.state.page + 1))}>Increease page</div>
                        <select disabled={content.state.loading} onChange={(e) => (content.updateCountry(e.target.value))}value={content.state.selectedCountry}>{countries}</select> <br/>
                        <select onChange={(e) => (content.updateTopic(e.target.value))} value={content.state.selectedTopic}><option value=""></option>{topicOptions}</select><br/>
                        <div>{content.state.selectedTopic}</div>
                        <br/>{content.state.selectedCountry}
                        <ul>
                        {docList.slice((content.state.page * 10), (content.state.page*10)+10)}
                        </ul>
                        
                    </div>)
                }}
            </Subscribe>
        )
    }
}
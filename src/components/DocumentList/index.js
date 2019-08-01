import { Subscribe } from "unstated";
import ContentContainer from "../../containers/ContentContainer";
import HTMLstrip from "../../util/HTMLstrip";
import style from "./style.scss";
import SVG from "../../util/SVG";

function DocItem({doc}) {
    let managerTag = (doc.roles.length === 1 && doc.roles[0] === "Manager") ? <span className={style.managerTag}>For Managers</span> : null
    let target = (doc.type === "link") ? "_blank" : "";
    return <li className={style.docItem}>
        <a className={style.container} href={doc.url} target={target}>
            {SVG(doc.type, style.svg)}
            <span className={style.text}>{HTMLstrip(doc.title)}</span> {managerTag}
            
        </a>
    </li>
    
}

function CCCallout() {
    return <li>
        <div className={style.container}>
            <img src="http://mercerlink.mercer.com/Style%20Library/Mercer/img/flags-36.png" className={style.usicon} />
            <div>
                US &amp; Canadian Colleagues: Visit <a href="https://colleagueconnect.mmc.com/en-us/CareerAndRewards/Pages/CareerAndRewardsHome.aspx" target="_blank">Colleague Connect</a> for your Policies &amp; Benefits Information
            </div>
        </div>
    </li>
}


export default function() {
    return <Subscribe to={[ContentContainer]}>
        {function({state}) {
            let loading = [];
            for(let i = 0; i < state.documents.length; i++) {
                loading.push(<li ><div className={style.container}>&nbsp;</div></li>)
            }
            let loadingClass = ""
            if(state.loading) {
                loadingClass = style.loading; 
               // return <ul className={style.list}>{loading}</ul>
            }
            let docCut = state.documents.slice((state.page * state.increment), state.page * state.increment + state.increment);
               
           
            let documents = docCut.map(e => <DocItem key={e.id} doc={e} loading={state.loading}/>);
         
            let cccallout = ((state.selectedCountry === "United States of America" || state.selectedCountry === "Canada") && !state.loading) ? <CCCallout /> : null;
            if(!state.loading && state.documents.length === 0) {
                return <ul className={`${style.list} ${loadingClass}`}>
                {cccallout}
                <li><span style={{paddingLeft: "18px"}} className={style.container}>Refer to the information at the right</span></li>
                </ul>
            }
           return <ul className={`${style.list} ${loadingClass}`}>
                {cccallout}
                {documents}
            </ul>
        }}
    </Subscribe>
}
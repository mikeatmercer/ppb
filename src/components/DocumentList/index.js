import { Subscribe } from "unstated";
import ContentContainer from "../../containers/ContentContainer";
import HTMLstrip from "../../util/HTMLstrip";
import style from "./style.scss";
import {Component} from "preact";
class DocItem extends Component {
    constructor() {
        super();
        this.state = {
            activeClass: ""
        }
    }
    componentDidMount() {
       /* setTimeout(function(){
            this.setState({activeClass: style.active})
        }.bind(this), 1);*/
    }

    render({doc}) {
        return <Subscribe to={[ContentContainer]}>
            {({state}) => {
let managerTag = (doc.roles.length === 1 && doc.roles[0] === "Manager") ? <span className={style.managerTag}>For Managers</span> : null
let active = (state.fade) ? style.active : "";

return <li className={`${style.docItem} ${active}`}>
    <a href={doc.url} target="_blank" className={style.container}>{SVG(doc.type)}<span className={style.text}>{HTMLstrip(doc.title)}</span> {managerTag} {doc.id}
    </a>

</li>
            }}
        </Subscribe>
        
    }
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
function SVG(type) {
    switch(type) {
        case "download":
            return <svg className={style.svg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
        
        case "link":
            return <svg className={style.svg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
      
    }
}

export default function() {
    return <Subscribe to={[ContentContainer]}>
        {function({state}) {
            let loading = [];
            for(let i = 0; i < state.documents.length; i++) {
                loading.push(<li ><div className={style.container}>&nbsp;</div></li>)
            }
            if(state.loading) {
                return <ul className={style.list}>{loading}</ul>
            }
            let docCut = state.documents.slice((state.page * state.increment), state.page * state.increment + state.increment);
            let documents = docCut.map(e => <DocItem key={e.id} doc={e} />);
         
            let cccallout = (state.selectedCountry === "United States of America" || state.selectedCountry === "Canada") ? <CCCallout /> : null;
           return <ul className={style.list}>
                {cccallout}
                {documents}
            </ul>
        }}
    </Subscribe>
}
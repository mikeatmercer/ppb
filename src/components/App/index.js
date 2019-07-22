import { Component } from "preact";
import {Provider, Subscribe} from "unstated";

import LanguageSelector from "../LanguageSelector";
import LanguageContainer from "../../containers/LanguageContainer";
import ContentContainer from "../../containers/ContentContainer";
import TopicSelector  from "../TopicSelector";
import style from "./style.scss";
import CountrySelector from "../CountrySelector";
import DocumentList from "../DocumentList";
import TopBar from "../TopBar";
import SideBarContent from "../SideBarContent";
import Pagination from "../Pagination";


function Column(pr) {
    let headerText = pr.headerTitle || <span>&nbsp;</span>;
    return <div className={style.column}>
        <h2 style={{backgroundColor: pr.headerColor}} className={style.column_header}>{headerText}</h2>
        <div className={style.column_body}>
            {pr.children}
        </div>
    </div>
}


class App extends Component {
    componentDidMount() {
        this.props.cLanguage.setLanguage(); 
        this.props.cContent.initializeContent();
    }

    render(props,state) {
        return (
            
            <div className={style.ppb_mainAppPage} id="ppb_mainAppPage">
                
                <LanguageSelector />
                <div className={style.leftCol}>
                <Column headerTitle={props.cLanguage.state.currentLanguage.translations.MainTitle} headerColor={"#43286d"}>
                    <TopicSelector />
                    <CountrySelector />
                    <DocumentList />

            
                </Column>
                <Pagination />
                </div>
                <div className={style.rightCol}>
                    <Column headerTitle={props.cLanguage.state.currentLanguage.translations.SidebarTitle} headerColor={"#004c50"}>
                        <TopBar>
                            {props.cLanguage.state.currentLanguage.translations.SidebarInfo}
                        </TopBar>
                        <SideBarContent/>
                        
                 
                    </Column>
                </div>
        </div>
        
        ) 
    }

}


export default function() {
    return (
        <Provider>
            <Subscribe to={[LanguageContainer,ContentContainer]}>
                {function(language, content) {
                    return (
                        <App cLanguage={language} cContent={content}/>
                    )
                }

                }
            </Subscribe>
        </Provider>
    )
}
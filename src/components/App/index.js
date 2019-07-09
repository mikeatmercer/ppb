import { h, Component, render } from "preact";
import {Provider, Subscribe, Container} from "unstated";
import $ from "jquery";

import LanguageSelector from "../LanguageSelector";
import LanguageContainer from "../../containers/LanguageContainer";
import ContentContainer from "../../containers/ContentContainer";
import TopicSelector  from "../TopicSelector";



class App extends Component {
    componentDidMount() {
        this.props.cLanguage.setLanguage(); 
        this.props.cContent.initializeContent();
    }

    render(props,state) {

        return (
            
            <div id="ppb_mainAppPage">
            <LanguageSelector />
            
            
            <br/>
            <div>{props.cLanguage.state.currentLanguage.translations.mainTitle}</div>
            This is the ppb app <br/>
            <TopicSelector />
            
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
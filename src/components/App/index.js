import { h, Component, render } from "preact";
import {HashRouter, Route,Link, withRouter} from "react-router-dom";
import {Provider, Subscribe, Container} from "unstated";
import $ from "jquery";

import LanguageSelector from "../LanguageSelector";
import LanguageContainer from "../../containers/LanguageContainer";




class App extends Component {

    componentDidMount() {
        
    }
    render(props,state) {

        return (
            
            <div id="ppb_mainAppPage">
            <LanguageSelector />
            
            <br/>
            <div>{props.cLanguage.state.currentLanguage.translations.mainTitle}</div>
            This is the ppb app <br/>
            
        </div>
        
        ) 
    }
    componentDidMount() {
        this.props.cLanguage.setLanguage(); 
    }
}


export default function() {
    return (
        <Provider>
            <Subscribe to={[LanguageContainer]}>
                {function(language) {
                    return (
                        <App cLanguage={language}/>
                    )
                }

                }
            </Subscribe>
        </Provider>
    )
}
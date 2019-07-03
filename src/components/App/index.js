import { h, Component, render } from "preact";
import {HashRouter, Route,Link, withRouter} from "react-router-dom";
import {Provider, Subscribe, Container} from "unstated";
import $ from "jquery";

import LanguageSelector from "../LanguageSelector";
import LanguageContainer from "../../containers/LanguageContainer";

class NavApp extends Component {
    constructor() {
        super(); 
        this.listener = null;
        this.state = {
            lang: ""
        }
    }
    componentDidMount() {
        //console.log(this.props);
        this.listener = this.props.history.listen(() => {
            // view new URL
           // console.log('New URL', this.props.history.location.pathname);
           // console.log(this.props.match.params.lang);
           var lang = this.props.history.location.pathname.split("/").filter((e) => {
               return e != false;
           })[0]
           if(lang !== this.state.lang) {
               this.setState({lang: lang});
              // console.log('updated listener');
           }
           
           //if(this.state.mounted){console.log('change')};
        });
        if(this.props.match.params.lang) {
            return ;
        }
        var userCountry = localStorage.getItem('country') || JSON.parse($('#hdnMLDTM').val()).Country;
    }
    componentWillMount() {
        this.setState({mounted: true, lang: this.props.match.params.lang});

        //console.log("updated mount");
    }
    componentWillUnmount() {
        this.listener();
    }
    componentDidUpdate(prev) {
       //console.log(prev.match.params.lang)
        //console.log(prev.match.params.filter)
        //console.log(this.props.match.params.lang)
        //console.log(this.props.match.params.filter)
    }

    render(props,state) {
        // console.log(props)
        console.log(props.match.params.lang);
       return <div>
           {this.state.lang}<br/>
            <Link to="/en/managers">Link to english managers </Link><br/>
            <Link to="/fr/colleagues">Link to french colleagues </Link>
        </div>
    }
}

const Tester = withRouter(NavApp)


class App extends Component {

    componentDidMount() {
        
    }
    render(props,state) {

        return (
            
            <div id="ppb_mainAppPage">
            <LanguageSelector />
            <HashRouter >
                <div>
                <Route path="/" exact component={Tester} />
                <Route path="/:lang" exact component={Tester} />
                <Route path="/:lang/:filter" component={Tester} />
                </div>
                
            </HashRouter>
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
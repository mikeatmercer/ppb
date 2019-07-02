import { h, Component } from "preact";
import {HashRouter, Route} from "react-router-dom";
import Home from "../home_page";
import Profile from "../profile";
import "./style.scss";
import {Provider, Subscribe, Container} from "unstated";

class TestContainer extends Container {
  state = {
    testValue: "test value"
  };
}

export default class App extends Component {

  render(props) {
    return (
    <Provider> 
    <div>
    <Subscribe to={[TestContainer]}>
      {test => (

  
        <HashRouter>
          
        <div>
         <Route exact path="/" component={Home} />
         <Route fakeValue={"fake Value"} testValue={test.state.testValue} exact path="/profile" component={Profile} />
       </div>
        </HashRouter> 

      )}

    </Subscribe>
      
    </div>
    </Provider> 
      
    );
  }
}

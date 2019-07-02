import { h, Component } from "preact";
import $ from "jquery";

export default class listTest extends Component {
    constructor() {
        super();
        this.state = {
            textInput: '',
            options: [],
            matches: []
        }
        this.dupCheck = this.dupCheck.bind(this);
        this.createList = this.createList.bind(this); 
    }
    componentDidMount() {
        $.ajax({
            url: "http://content-ua.mercer.com/_api/web/lists/GetByTitle('SolutionPortfolio')/Items?$top=500&$filter=Published eq 1",
            headers: {
                "accept": "application/json;odata=verbose",
              },
              success: function(data) {
                  
                  var results = [];
                  var objectChecker = ["Client_x0020_Needs", "Countries", "Regions","ClientType", "Businesses","Countries" ];
               
                data.d.results.forEach( e => {
                    //console.log(e);
                    if(e.Keywords !== null) {
                        var array = e.Keywords.split(/;|,/);
                        array.forEach(e => {
                            var trim = e.trim();
                            if(this.dupCheck(results, trim)) {
                                results.push({label: trim, url: "http://google.com/"+trim});
                            }
                            
                        });
                    }
                    if(e.NavigateURL && e.NavigateURL.Description) {
                        let trim = e.NavigateURL.Description.trim();
                        if(this.dupCheck(results, trim )) {
                            results.push({label:trim, url: e.NavigateURL.Url});
                        }
                    }
                    objectChecker.forEach(o =>{
                        e[o].results.forEach(e => {
                            if(this.dupCheck(results, e.Label)){
                                results.push({label: e.Label, url: `http://google.com/${o}/${e.Label}/`});
                            }
                        })
                    })

                    
                    

                    /*e.Client_x0020_Needs.results.forEach(e => {
                        if(this.dupCheck(results, e.Label)){
                            results.push({label: e.Label, url: "http:google.com/"+e.Label});
                        }
                    });*/
                    
                });
                this.setState({options: results});
             
                
              }.bind(this),
              error:  function (error) {
               console.log(error)
              }
        })
    }
    dupCheck(array, value) {
        var unique = true;
        array.forEach(e => {
            if (value.toLowerCase() === e.label.toLowerCase() ){
                unique = false; 
            }
        });
        return unique; 
    }
    handleInput(e) {
        this.setState({textInput: e.target.value});
       // this.createList();
    }
    createList() {
        if(this.state.textInput.length < 2) {
            return []; 
        }
        var matches =  this.state.options.filter(e => {
            return e.label.toLowerCase().indexOf(this.state.textInput.toLowerCase()) !== -1;
        })
        matches = matches.slice(0,10);
        return matches;
        
    }
    render(props,state) {
        var matchList = this.createList().map(e => {

            return <li><a href={e.url}>{e.label}</a></li>
        })
      return  <div>
          <input type="text" onInput={this.handleInput.bind(this)} value={state.textInput} />
          <div>{state.textInput}</div>
        <ul>{matchList}</ul>
      </div> 
    }
}

import {Container} from "unstated";
import $ from "jquery";
import ajaxQuery from "../util/ajaxGet.js";
import HTMLstrip from "../util/HTMLstrip.js";
import HTMLClean from "../util/HTMLclean";

//SEND Filtername and page number down to list, compile it there. Create a page update function
export default class ContentContainer extends Container { 
    constructor() {
        super();
        this.state = {
            selectedCountry: null,
            documents: [],
            documentsUnfiltered: [],
            supportHTML: [],
            supportHTMLstatus: "loading",
            countryOptions: [],
            docsLoading: true,
            topicsLoading: true, 
            selectedTopic: "", 
            countryLoading: true,
            topicOptions: [],
            loading: true,
            page: 0,
            increment: 20,
            fade: true
        }
        this.updateTopic = this.updateTopic.bind(this);
        this.updatePage = this.updatePage.bind(this);
        this.updateCountry = this.updateCountry.bind(this);
    }
    
    updateTopic(topic) {
     
       this.setState({loading: true});
       
      
        
        setTimeout(function(){
            this.setState({selectedTopic: topic, page: 0});
            if(!topic || topic === "all") {
                this.setState({documents: this.state.documentsUnfiltered});
            
            } else {
                let filtered = this.state.documentsUnfiltered.filter(function(e){
                    let inArray = e.topics.filter(e => e === topic);
                    return inArray.length > 0; 
                });
                this.setState({documents: filtered});
            }
            this.setState({loading: false});
  
        }.bind(this),250);
      
        
    }
            
    updatePage(newCount) {
        console.log("called");
        if($("#s4-workspace").scrollTop() > 250) {
            $("#s4-workspace").scrollTop(250);
        }
 
        this.setState({loading: true});
       
        setTimeout(function(){
            this.setState({page: newCount, loading: false});
           
        }.bind(this),250); 
    }
    updateCountry(country) {
        this.setState({topicsLoading: true, fade: false, loading: true, docsLoading: true, selectedTopic: null, selectedCountry: country, page: 0,countryLoading: true});
        localStorage.setItem('country',country);
        this.updateSupportHTML(country);
        let query = `lists/GetByTitle('HRPolicies')/items?$select=ID,IsHighlighted,PolicyName,File,Country/Title,ContentType/Name,ContentTypeId,URL,Topic/Title,Role/Title&$top=999&$expand=Role,Topic,ContentType,ContentType/Name,File,Country,Country/Title&$filter=substringof('${country}',Country/Title)&$orderby= PolicyName asc`;

        let updateCallback = function(data) {
            let topicOptions = [];
            let doclist = data.d.results.map(function(e){
                e.type = e.ContentType.Name;
                if(e.ContentType.Name == "Link to a Document" && !e.URL) {
                    if(!e.File.ServerRelativeUrl) {
                        return {
                            bad: true
                        }
                    } else {
                        e.ContentType.Name = "Document";
                    }
                    
                }
    
                return {
                    title: HTMLstrip(e.PolicyName),
                    topics: e.Topic.results.map(e => e.Title),
                    url: (e.ContentType.Name == "Link to a Document") ? e.URL.Url : e.File.ServerRelativeUrl,
                    type: (e.ContentType.Name == "Link to a Document") ? "link" : "download",
                    highlighted: e.IsHighlighted ,
                    roles: e.Role.results.map(e => e.Title),
                    id: e.ID,
                }
            });
            doclist = doclist.filter(function(e){
                return !e.bad;
            });
            doclist = doclist.sort(function(a,b){
                if(a.title < b.title) { return -1; }
                if(a.title > b.title) { return 1; }
                return 0;
            });
      
                this.setState({documentsUnfiltered:doclist, documents:doclist, loading: false,countryLoading:false});
                
                data.d.results.forEach((e) => {
                    
                    e.Topic.results.forEach((t)=> {
                        topicOptions.push(t.Title);
                    });
                });
      
                topicOptions = topicOptions.filter((item,index,self) => self.indexOf(item) === index);
                this.setState({topicOptions: topicOptions, page: 0});
                this.setState({fade:true});
        }.bind(this);
        ajaxQuery(query,updateCallback);
      

    }
    updateSupportHTML(country) {
        this.setState({supportHTMLstatus: "loading"});
        const htmlCallback = function(data) {
         //Make contact card thing work  
    
         
         var newHTML = data.d.results.map(e => HTMLClean(e.ContactTitle));
        
         this.setState({supportHTMLstatus: "loaded", supportHTML: newHTML});
         
        }.bind(this);
    
        let query = `lists/GetByTitle('HRContacts')/items?$select=ShowUser,ContactTitle,Country/Title&$top=999&$expand=Country,Country/Title&$filter=substringof('${country}',Country/Title) and ShowUser eq 1`;
        ajaxQuery(query, htmlCallback);

    }
    initializeContent(country) {
        var country = country || localStorage.getItem('country') || JSON.parse($('#hdnMLDTM').val()).Country.trim() || "United States of America"; 
        this.updateCountry(country);
        const countryQuery =  "lists/GetByTitle('HRCountry')/items";
        const countryCallback = function(data) {
            var options = data.d.results.map((e) => {
                return e.Title  
            });
            this.setState({countryOptions: options.filter(e => e !== "All")})
        }.bind(this);
        ajaxQuery(countryQuery, countryCallback);
   
    }

}



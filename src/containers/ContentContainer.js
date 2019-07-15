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
            topicOptions: [],
            loading: true,
            page: 0,
            increment: 20
        }
        this.updateTopic = this.updateTopic.bind(this);
        this.updatePage = this.updatePage.bind(this);
        this.updateCountry = this.updateCountry.bind(this);
    }
    
    updateTopic(topic) {
     
        this.setState({selectedTopic: topic, page: 0});
        if(!topic) {
            this.setState({documents: this.state.documentsUnfiltered});
            return ; 
        }
        let filtered = this.state.documentsUnfiltered.filter(function(e){
            let topicList = e.Topic.results.map(e => e.Title);
            let inArray = topicList.filter(e => e === topic);
            return inArray.length > 0;
        });
        this.setState({documents: filtered});
    }
    updatePage(newCount) {
        this.setState({page: newCount});
        console.log(newCount);
    }
    updateCountry(country) {
        this.setState({topicsLoading: true, loading: true, docsLoading: true, selectedTopic: null, selectedCountry: country, page: 0});
        localStorage.setItem('country',country);
        this.updateSupportHTML(country);
        let query = `lists/GetByTitle('HRPolicies')/items?$select=IsHighlighted,PolicyName,File,Country/Title,ContentType/Name,ContentTypeId,URL,Topic/Title,Role/Title&$top=999&$expand=Role,Topic,ContentType,ContentType/Name,File,Country,Country/Title&$filter=substringof('${country}',Country/Title)`;

        let updateCallback = function(data) {
            let topicOptions = [];
            let doclist = data.d.results.map(function(e){
                if(e.ContentType.Name == "Link to a Document" && !e.URL) {
                    return {
                        bad: true
                    }
                }
                return {
                    title: HTMLstrip(e.PolicyName),
                    topics: e.Topic.results.map(e => e.Title),
                    url: (e.ContentType.Name == "Link to a Document") ? e.URL.Url : e.File.ServerRelativeUrl,
                    type: (e.ContentType.Name == "Link to a Document") ? "link" : "download",
                    highlighted: e.IsHighlighted 
                }
            });
            doclist = doclist.filter(function(e){
                return !e.bad;
            });
      
                this.setState({documentsUnfiltered:doclist, documents:doclist, loading: false});
                
                data.d.results.forEach((e) => {
                    
                    e.Topic.results.forEach((t)=> {
                        topicOptions.push(t.Title);
                    });
                });
      
                topicOptions = topicOptions.filter((item,index,self) => self.indexOf(item) === index);
                this.setState({topicOptions: topicOptions, });
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
    
        let query = `lists/GetByTitle('HRContacts')/items?$select=ContactTitle,Country/Title&$top=999&$expand=Country,Country/Title&$filter=substringof('${country}',Country/Title)`;
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
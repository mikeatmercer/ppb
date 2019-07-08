import {Container} from "unstated";
import $ from "jquery";

//SEND Filtername and page number down to list, compile it there. Create a page update function
export default class LanguageContainer extends Container { 
    state = {
        selectedCountry: null,
        documents: [],
        supportHTML: "",
        countryOptions: [],
        docsLoading: true,
        topicsLoading: true, 
        selectedTopic: null, 
        topicOptions: [],
        loading: true,
        page: 0
    }
    updateCountry(country) {
        this.setState({topicsLoading: true, docsLoading: true, selectedTopic: null, selectedCountry: country, page: 0});
        $.ajax({
            url: `http://sites-ua.mercer.com/sites/HR/_api/web/lists/GetByTitle('HRPolicies')/items?$select=PolicyName,File,Country/Title,ContentType/Name,ContentTypeId,URL,Topic/Title,Role/Title&$top=999&$expand=Role,Topic,ContentType,ContentType/Name,File,Country,Country/Title&$filter=substringof('${country}',Country/Title)`,
            headers: {
                "accept": "application/json;odata=verbose"
            },
            success: function(data) {
                let topicOptions = [];
                this.setState({documents:data.d.results, loading: false});
                
                data.d.results.forEach((e) => {
                    
                    e.Topic.results.forEach((t)=> {
                        topicOptions.push(t.Title);
                    });
                });
                topicOptions = topicOptions.filter((item,index,self) => self.indexOf(item) === index);
                this.setState({topicOptions: topicOptions});
            }.bind(this)
        })

    }
    initializeContent(country) {
        var country = country || localStorage.getItem('country') || JSON.parse($('#hdnMLDTM').val()).Country.trim() || "All"; 
        this.updateCountry(country); 
        $.ajax({
            url: "http://sites-ua.mercer.com/sites/HR/_api/web/lists/GetByTitle('HRCountry')/items",
            headers: {
                "accept": "application/json;odata=verbose",
            },
            success: function(data) {
                var options = data.d.results.map((e) => {
                    return e.Title  
                });
                this.setState({countryOptions: options});
            }.bind(this)
        })
      
    }

}
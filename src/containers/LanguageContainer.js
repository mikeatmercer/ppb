import {Container} from "unstated";
import $ from "jquery";

export default class LanguageContainer extends Container {
    state = {
        languageOptions: [
            
        ],
        currentLanguage: {
            value: null, 
            translations: {
               
            }
        }
    }
    updateLanguage(value, optionLoad) {
        let options = optionLoad || this.state.languageOptions; 

        let updatedLanguage = options.filter(e=> {
            return e.value === value
        })
        if(!updatedLanguage.length) {
            return ;
        }
        this.setState({
            currentLanguage: {
                value: updatedLanguage[0].value,
                translations: updatedLanguage[0].translations
            }
        })
        localStorage.setItem("language", value);
        localStorage.setItem('translations', JSON.stringify(updatedLanguage[0].translations));
    }
    setLanguage () {
        const langSet = (localStorage.getItem('language') && localStorage.getItem('translations'));
        if(langSet) {
            this.setState({
                currentLanguage: {
                    value: localStorage.getItem('language'),
                    translations: JSON.parse(localStorage.getItem('translations'))
                }
            })
        }

      
        $.ajax({
            url: "http://sites-ua.mercer.com/sites/HR/_api/web/lists/GetByTitle('HRTranslations')/items?$select=*,Countries/Title&$expand=Countries",
            headers: {
                "accept": "application/json;odata=verbose",
            },
            success: function(data) {
                let options = data.d.results.map(e => {
                    let countries = e.Countries.results.map(e => {
                        return e.Title.trim()
                    });
                    return {
                        value: e.Title,
                        title: e.Label,
                        id: e.ID,
                        translations: JSON.parse(e.TranslationJSON),
                        countries: countries
                    }
                })
           
                
                this.setState({languageOptions: options});  

                //IF LANGUAGE IS ALREADY SET, UPDATE CURRENT LANGUAGE WITH NEW LANGUAGE
                if(langSet) {
                    this.updateLanguage(localStorage.getItem('language'));
                    return ;
                }
                        
                let userData = JSON.parse($('#hdnMLDTM').val());
           
                let selectedOption = options.filter(function(e){
                    let inCountry = e.countries.filter(e => {
                        return userData.Country.trim() === e
                    });
                    return inCountry.length > 0;
                });
             
                let updateValue = (selectedOption.length) ? selectedOption[0].value : "en";
                this.updateLanguage(updateValue, options);
        

            }.bind(this),
            error:  function (error) {
                
            }
        })
  
    }
}
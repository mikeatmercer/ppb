import { Subscribe } from "unstated";
import ContentContainer from "../../containers/ContentContainer";
import LanguageContainer from "../../containers/LanguageContainer";
import SelectorSm from "../SelectorSm";
import style from "./style.scss";

export default function() {
    return <Subscribe to={[ContentContainer, LanguageContainer]}>
    {function(content, lang) {

        if(content.state.countryOptions.length < 2) {
            return <div className={style.container}>&nbsp;</div>
        }
     
        let labelText = lang.state.currentLanguage.translations.SelectCountryLabel || "Showing Results for:";
        let options = content.state.countryOptions.map(function(e){
            return {
                value: e,
                title: e
            }
        })
        return(
            <div className={style.container}>
                <span className={style.label}>{labelText.trim()} </span> 
                <SelectorSm
                    disabledState={content.state.loading}
                    options={options} 
                    changeMethod={content.updateCountry}
                    selected_value={content.state.selectedCountry}
                    selected_label={content.state.selectedCountry}
                />
            </div>
        )
    
    }}
    </Subscribe>
}
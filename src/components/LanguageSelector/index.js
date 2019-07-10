import style from "./style.scss";
import {Subscribe} from "unstated";
import SelectorSm from "../SelectorSm";
import LanguageContainer from "../../containers/LanguageContainer.js";

export default function() {
    return (
        <Subscribe to={[LanguageContainer]} >
            {lang => {
                
                let optionsNew = lang.state.languageOptions.map(function(e){
                    return {value: e.value, title: e.title}
                });
                let currentCountry = lang.state.languageOptions.filter(function(e){
                    return e.value === lang.state.currentLanguage.value;
                });
                let label = (!currentCountry.length)? "" : currentCountry[0].title;
                return(
                    <div className={style.language_selector}>
                        <label className={style.language_label}>Language: </label>
                        <SelectorSm 
                            selected_value={lang.state.currentLanguage.value} 
                            selected_label={label} 
                            options={optionsNew}
                            changeMethod={lang.updateLanguage}/>
                        
                    </div>
                ) 
            }

            }
        </Subscribe>
    ) 
}

import style from "./style.scss";
import {Subscribe} from "unstated";

import LanguageContainer from "../../containers/LanguageContainer.js";

export default function() {
    return (
        <Subscribe to={[LanguageContainer]} >
            {lang => {
                let options = lang.state.languageOptions.map(function(e,i) {
                    return <option key={e.id} value={e.value}>{e.title}</option>
                });
                return <select value={lang.state.currentLanguage.value} onChange={(e)=>{lang.updateLanguage(e.target.value)}} className={style.selector}>{options}</select>
            }

            }
        </Subscribe>
    ) 
}
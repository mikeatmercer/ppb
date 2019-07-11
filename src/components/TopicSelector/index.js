import style from "./styles.scss";
import {Subscribe} from "unstated";
import ContentContainer from "../../containers/ContentContainer";
import LanguageContainer from "../../containers/LanguageContainer";

export default function() {
return <Subscribe to={[ContentContainer, LanguageContainer]}>
{function(content, lang){
    
    let instructions = lang.state.currentLanguage.translations.TopicInstructions || <span>&nbsp;</span>
    let placeholder = content.state.selectedTopic || (lang.state.currentLanguage.translations.TopicPlaceholder || <span>&nbsp;</span>);
    let loadingStyle = (content.state.loading === true)? style.disabled : "";
    let topicOptions = content.state.topicOptions.map(e => <option value={e}>{e}</option>)
    return(    
    <div className={style.box}>
        <div className={`${style.container} ${loadingStyle}`}>
            <div className={style.instructions}>{instructions}</div>
            <div className={style.placeholder}>{placeholder}</div>
            <select 
                className={style.select}
                onChange={(e) => (content.updateTopic(e.target.value))} 
                value={content.state.selectedTopic}
                disabled={content.state.loading}>
                    <option value=""></option> 
                {topicOptions}
            </select>
        </div>
    </div>
    )

}}
</Subscribe>
    
}
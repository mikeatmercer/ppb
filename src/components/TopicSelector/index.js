import style from "./styles.scss";
import {Subscribe} from "unstated";
import ContentContainer from "../../containers/ContentContainer";
import LanguageContainer from "../../containers/LanguageContainer";
import {Component} from "preact";


export default class TopicSelector extends Component {
    constructor() {
        super();
        this.state = {
            focused: false
        }
        this.focusSwitch = this.focusSwitch.bind(this);
    }
    focusSwitch(state) {
        this.setState({focused: state});
    }
 
    render() {
        return <Subscribe to={[ContentContainer, LanguageContainer]}>
{function(content, lang){
    
    let instructions = lang.state.currentLanguage.translations.TopicInstructions || <span>&nbsp;</span>
    let placeholder = content.state.selectedTopic || (lang.state.currentLanguage.translations.TopicPlaceholder || <span>&nbsp;</span>);
    placeholder = (content.state.selectedTopic === "all") ? "All Topics" : placeholder; 
    let loadingStyle = (content.state.loading === true)? style.disabled : "";
    let topicOptions = content.state.topicOptions.map(e => <option value={e}>{e}</option>)
    let focusClass = (this.state.focused)? style.focused : ""
    return(    
    <div className={style.box}>
        <div className={`${style.container} ${loadingStyle}`}>
        {focusClass}
            <div className={style.instructions}>{instructions}</div>
            <div className={style.placeholder}>{placeholder}</div>
           
            <select onFocus={()=>(this.focusSwitch(true))} onBlur={this.focusSwitch(false)} ref={select => this.select = select}
                className={`${style.select} ${focusClass}`}
                onChange={(e) => (content.updateTopic(e.target.value))} 
                value={content.state.selectedTopic}
                disabled={content.state.loading}>
                    <option value="all">All topics</option>
                    {topicOptions}
            </select>
            
        </div>
    </div>
    )

}.bind(this)}
</Subscribe>
    }

    
}
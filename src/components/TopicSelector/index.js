import style from "./styles.scss";
import {Subscribe} from "unstated";
import ContentContainer from "../../containers/ContentContainer";
import LanguageContainer from "../../containers/LanguageContainer";
import {Component} from "preact";
import $ from "jquery";
import TopicList from "./TopicList";




export default class TopicSelector extends Component {
    constructor() {
        super();
        this.state = {
            focused: false,
        }  
        this.addFocus = this.addFocus.bind(this);
        this.windowListener;
  
    }
  
    addFocus(e) {
        let swap = (!e)? false : true; 
        
        this.setState({focused: swap });
    }
    componentDidMount() {
        this.windowListener = $(document).on('click',function(e){     
            if (!this.state.focused ) {
                return ; 
            }       
            if(
                e.pageX < $(this.container).offset().left || 
                e.pageX > $(this.container).offset().left + $(this.container).innerWidth()  || 
                e.pageY <  $(this.container).offset().top || 
                e.pageY > $(this.container).offset().top + $(this.container).innerHeight() + $(this.dropdown).innerHeight() ||
                e.pageY <= 35
                ){
             
                this.setState({focused: false, highlight: -1});
            }
            

        }.bind(this))
    }
    componentWillUnmount() {
        this.windowListener = null; 
    }
    
 
    render() {
     
        return <Subscribe to={[ContentContainer, LanguageContainer]}>
{function(content, lang){
    
    let instructions = lang.state.currentLanguage.translations.TopicInstructions || <span>&nbsp;</span>
    let placeholder = content.state.selectedTopic || (lang.state.currentLanguage.translations.TopicPlaceholder || <span>&nbsp;</span>);
    placeholder = (content.state.selectedTopic === "all") ? lang.state.currentLanguage.translations.AllTopics : placeholder; 
    let loadingStyle = (content.state.loading === true)? style.disabled : "";
  
    let focusStyle = (this.state.focused) ? style.focused : ""
   
    let topicDropdown = (this.state.focused) ? <TopicList 
        selected={content.state.selectedTopic} 
        options={content.state.topicOptions.map((i) => ({title : i, value: i}))} 
        updateTopic={content.updateTopic}
        disableFocus={this.addFocus}
        AllTopicsTranslated={lang.state.currentLanguage.translations.AllTopics}
        /> : null;
    const focusSwap = function() {  
        let swap = (this.state.focused) ? false : true;
        this.addFocus(swap);
    }.bind(this);
    return(    
    <div className={style.box}>
        <div onClick={focusSwap} className={`${style.container} ${loadingStyle} ${focusStyle}`} ref={container => this.container = container} >
   
            <div className={style.instructions}>{instructions}</div>
            <div className={style.placeholder}>{placeholder}</div>
           
           
           {topicDropdown}
            
            
        </div>
    </div>
    )

}.bind(this)}
</Subscribe>
    }

    
}


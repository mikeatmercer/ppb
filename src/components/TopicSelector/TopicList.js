import {Component} from "preact";
import $ from "jquery";
import style from "./styles.scss";


function ListItem(props) {
    function click() {
        props.disableFocus(false);
        props.updateTopic(props.e.value);
    }
    const selectedClass = (props.selected === props.e.value || props.highlighted) ? style.selected : ""
    return <div onClick={click} className={`${style.option} ${selectedClass}`} ref={props.setRef}>{props.e.title}</div>
}

export default class TopicList extends Component {
    constructor (props){
        super(); 
        this.keyClicks;
        this.itemRefs = []; 
        const options = [{title: "All Topics", value: "all"}].concat(props.options)
        let initialHighlight = -1; 
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === props.selected) {
                initialHighlight = i;
            }
        }
        this.state = {
            highlight: initialHighlight,
            options: options,
            styles: "",
       
        }
        this.keyboardScroll = this.keyboardScroll.bind(this);
        this.handleKeyBoard = this.handleKeyBoard.bind(this);
    }
    handleKeyBoard(e) {
        if( (e.keyCode == 38 && this.state.highlight <= 0) || 
            (e.keyCode == 40 && this.state.highlight >= this.state.options.length - 1 ) ) {
            return false ; 
        }
        let newH = this.state.highlight + 1;
        
        switch(e.keyCode) {
            case 40: 
         
                this.keyboardScroll(this.itemRefs[newH]); 
                this.setState({highlight: newH});

                break;
            case 38:
        
                newH = this.state.highlight - 1;
                this.keyboardScroll(this.itemRefs[newH]); 
                this.setState({highlight: newH});
                break;
            case 13:
                this.props.updateTopic(this.state.options[this.state.highlight].value);
          
                this.props.disableFocus(false);
            
                return false ;
                break; 
        }
    }
    keyboardScroll(i) {
        const   scroll = $(this.listC).scrollTop(),
                lTop = Math.floor($(this.listC).offset().top),
                lBottom = lTop + $(this.listC).innerHeight(),
                iTop = Math.floor($(i).offset().top), 
                iBottom = iTop + $(i).innerHeight();
        if(iTop < lTop) {
            $(this.listC).scrollTop(scroll - (lTop - iTop));
            return ; 
        }
        if(iBottom > lBottom) {
            $(this.listC).scrollTop(scroll + (iBottom - lBottom));
        }
    }
    componentDidMount() {
     
        this.setState({styles: $("#s4-workspace").attr('style')});
        let barPad = $(window).width() - $("#insert-dropdown").width();
        $("#s4-workspace").css({"overflow": "hidden", "box-sizing": "border-box", "padding-right": barPad });
        setTimeout(function(){
            if($(window).height() <= 650) {
                $("#s4-workspace").scrollTop(234);
            }
        }.bind(this), 100)
      
      if(this.state.highlight >= 0 ) {
          let current = this.itemRefs[this.state.highlight];
          if($(current).offset().top + $(current).innerHeight() >= $(this.listC).offset().top + $(this.listC).innerHeight()) {
            $(this.listC).scrollTop(
                ($(this.itemRefs[this.state.highlight]).offset().top - $(this.listC).offset().top ) / 2
            )
          }
          
       // $(this.listC).scrollTop(( $(this.itemRefs[this.state.highlight]).offset.top() - $(this.listC).offset().top ) / 2 );
      } 
      
      document.body.addEventListener('keydown', this.handleKeyBoard);
    }
    componentWillUnmount() {
        
        document.body.removeEventListener('keydown', this.handleKeyBoard); 
        $("#s4-workspace").attr("style", this.state.styles);
    }
    

    render(props, state) {
        let options = state.options.map((e,i) => <ListItem disableFocus={props.disableFocus} updateTopic={props.updateTopic} selected={props.selected} e={e} 
        setRef={(ref) => {this.itemRefs[i] = ref}}
        highlighted={state.highlight === i}
        />);
      
        return <div ref={container => this.listC = container}  className={style.optionList}>
            
                {options}
        </div>
    }
}
//<input ref={input => this.input = input} onKeyDown={this.handleKeyBoard} />
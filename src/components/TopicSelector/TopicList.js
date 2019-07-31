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
            options: options
        }
    }
    componentDidMount() {
        setTimeout(function(){
            if($(window).height() <= 600) {
                $("#s4-workspace").scrollTop(234);
            }
            $("#s4-workspace").css({"overflow": "hidden", "box-sizing": "border-box", "padding-right": 16 });
        }.bind(this), 150)
      this.keyClicks = function(e) {
        // Down = 40, Up = 38, Enter = 13
        if( (e.keyCode == 38 && this.state.highlight <= 0) || 
            (e.keyCode == 40 && this.state.highlight >= this.state.options.length - 1 ) ) {
            return false ; 
        }
        let newH = this.state.highlight + 1,
            listH,
            itemH,
            newS,
            scroll = $(this.listC).scrollTop();
        
        switch(e.keyCode) {
            case 40: 
                listH = Math.floor($(this.listC).innerHeight() + $(this.listC).offset().top);
                itemH = Math.floor($(this.itemRefs[newH]).innerHeight() + $(this.itemRefs[newH]).offset().top); 
                if(itemH > listH) {
                    console.log(scroll);
                    console.log(itemH);
                    console.log(listH);
                    newS =  scroll + (itemH - listH);
                    $(this.listC).scrollTop(newS)
                }
                this.setState({highlight: newH});

                break;
            case 38:
                newH = this.state.highlight - 1;
                itemH = Math.floor($(this.itemRefs[newH]).offset().top);
                listH = Math.floor($(this.listC).offset().top);
    
                if(itemH < listH) {
                    newS = scroll -( listH - itemH);
                    $(this.listC).scrollTop(newS);
                }
                this.setState({highlight: newH});
                break;
            case 13:
                this.props.disableFocus(false);
                this.props.updateTopic(this.state.options[this.state.highlight].value);
                break; 
        }

      }.bind(this);
      if(this.state.highlight >= 0) {
       // $(this.listC).scrollTop(( $(this.itemRefs[this.state.highlight]).offset.top() - $(this.listC).offset().top ) / 2 );
      } 
      
      document.body.addEventListener('keydown', this.keyClicks);
    }
    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.keyClicks); 
       $("#s4-workspace").css({'overflow': "auto", "padding-right": 0});
    }
    

    render(props, state) {
        let options = state.options.map((e,i) => <ListItem disableFocus={props.disableFocus} updateTopic={props.updateTopic} selected={props.selected} e={e} 
        setRef={(ref) => {this.itemRefs[i] = ref}}
        highlighted={state.highlight === i}
        />);
        return <div ref={container => this.listC = container} className={style.optionList}>{options}</div>
    }
}
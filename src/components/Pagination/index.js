import {Subscribe} from "unstated";
import ContentContainer from "../../containers/ContentContainer";
import LanguageContainer from "../../containers/LanguageContainer";
import style from "./style.scss";
import SVG from "../../util/SVG";

function PaginationButton(p) {
    function updater(e) {
        e.preventDefault();  
        e.stopPropagation();
        if(p.updateClick) {
            p.updateClick(p.value);
        }
        
        return false; 
    }
    
    return <div className={p.bClass} onClick={updater}>
        {p.children}
    </div>
}

function PageButtons(p) {
    

    return <Subscribe to={[ContentContainer]}>
        {(content) =>{
         
            if((content.state.documents.length <= content.state.increment)) {
                return null;
            }
            
            let totalPages = Math.floor(content.state.documents.length / content.state.increment) + (( content.state.documents.length % content.state.increment > 0) ? 1 : 0);
            let pageFlippers = [];
        
            for (let i = 0; i < totalPages; i++) {
                pageFlippers.push(i);
            }
            pageFlippers = pageFlippers.map(function(e){
                if(e === content.state.page) {
                    return <PaginationButton  key={e} bClass={`${style.flipper} ${style.active}`}>{e+1}</PaginationButton>
                }
                return <PaginationButton value={e} key={e} updateClick={content.updatePage} bClass={style.flipper}>{e + 1}</PaginationButton>
            });
            let hideBack = (content.state.page === 0) ? style.hideArrow : "";
            let hideForward = (content.state.page === (totalPages -1)) ? style.hideArrow : ""
            return <div className={style.flipperContainer}>
                <PaginationButton 
                    bClass={`${style.arrows} ${style.left} ${hideBack}`} 
                    updateClick={content.updatePage} 
                    value={content.state.page - 1}>
                    {SVG('chevron')} <span style="display:none">Back</span>
                </PaginationButton>
              
                <div className={style.pageHolder}>{pageFlippers}</div>
                <PaginationButton
                    bClass={`${style.arrows} ${style.right} ${hideForward}`}
                    updateClick={content.updatePage}
                    value={content.state.page + 1}>
                {SVG('chevron')}
                </PaginationButton>
            </div>
        }}
    </Subscribe>
}

export default function () {
    return <Subscribe to={[ContentContainer, LanguageContainer]}>
        {function(content,language){
            if(!content.state.documents.length) {
                return ;
            }
            console.log(content.state.page);
            let page = content.state.page,
                increment = content.state.increment,
                documents = content.state.documents,
                frontSplit = (page * increment),
                backSplit = (frontSplit + increment);
            const infoTrans = language.state.currentLanguage.translations.CountInfo || ""; 
            let entryCopy = infoTrans
                            .replace("[[Start]]", frontSplit + 1)
                            .replace('[[End]]', (backSplit <= documents.length)? backSplit : documents.length ) 
                            .replace('[[Total]]', documents.length); 
            return <div className={style.container}>
                <div >{entryCopy}</div>
                <PageButtons />
               
            </div>
        }}
    </Subscribe>
}

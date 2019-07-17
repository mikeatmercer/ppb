import {Subscribe} from "unstated";
import ContentContainer from "../../containers/ContentContainer";
import LanguageContainer from "../../containers/LanguageContainer";
import style from "./style.scss";

function PageButtons(p) {
    

    return <Subscribe to={[ContentContainer]}>
        {(content) =>{
            function updatePage(e) {
                e.preventDefault();
                content.updatePage(e.target.value);
            }
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
                    return <span className={`${style.flipper} ${style.active}`}>{e+1}</span>
                }
                return <button className={style.flipper} key={e} value={e}  onClick={updatePage}>{e + 1}</button>
            });
            return <div className={style.flipperContainer}>
       
                <button onClick={updatePage} value={content.state.page - 1}
                    style={{visibility: (content.state.page === 0)? "hidden": ""}}
                >
                    Back
                </button>
                {pageFlippers}
                <button onClick={updatePage} value={content.state.page + 1}
                    style={{visibility: (content.state.page == (totalPages - 1))? "hidden": ""}}
                >Next</button>
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
 
            let page = content.state.page,
                increment = content.state.increment,
                documents = content.state.documents,
                frontSplit = (page * increment),
                backSplit = (frontSplit + increment);
              
            return <div className={style.container}>
                <div >Showing {frontSplit + 1} to {(backSplit <= documents.length)? backSplit : documents.length} of {documents.length} entries</div>
                <PageButtons />
               
            </div>
        }}
    </Subscribe>
}

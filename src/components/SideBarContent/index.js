import styles from "./styles.scss";
import { Subscribe } from "unstated";
import ContentContainer from "../../containers/ContentContainer";
import LanguageContainer from  "../../containers/LanguageContainer";

function LinkList(p) {
    let loadingClass = (p.loading) ? styles.loading : "";
    let list = p.list.map(e => <li><a href={e.url} target="_blank">{e.title}</a></li>)
    return <div className={styles.section}>
        <Header title={p.title} />
        <ul className={`${styles.linklist} ${loadingClass}`}>
            {list}
        </ul>
        </div>
}
function Header({title}) {
    return <h2 className={styles.header}>{title}</h2>
}
function ContactHTML(p) {
    return <Subscribe to={[ContentContainer, LanguageContainer]}>
        {function(c,l){
            if(c.state.supportHTMLstatus === "loaded" && !c.state.supportHTML.length) {
                return; 
            }
            let loadingClass = (c.state.supportHTMLstatus === "loading") ? styles.loading : "";
            let content = p.html.map(function(e){
                return <div className={loadingClass} dangerouslySetInnerHTML={{ __html: e }}/>
            });
            return <div className={styles.section}>
                <Header title={l.state.currentLanguage.translations.NeedHelp} />
                {content}
                </div>
        }}
    </Subscribe>
  
   
}

export default function() {
    return <Subscribe to={[ContentContainer]}>
        {function(c){
        
            let quickLinks = c.state.documentsUnfiltered.filter((e) => ( e.highlighted));
            let linkDisplay = (quickLinks.length > 0) ? <LinkList loading={c.state.countryLoading} list={quickLinks} title={"Quick Links"} /> : null
            
            return <div className={styles.sidebar}>
                {linkDisplay}
                <ContactHTML html={c.state.supportHTML}status={c.state.supportHTMLstatus}/>
            </div>
            
        }}
    </Subscribe>

}

import styles from "./styles.scss";
import { Subscribe } from "unstated";
import ContentContainer from "../../containers/ContentContainer";

function LinkList(p) {
    let list = p.list.map(e => <li><a href={e.url} target="_blank">{e.title}</a></li>)
    return <div>
        <Header title={p.title} />
        <ul className={styles.linklist}>
            {list}
        </ul>
        </div>
}
function Header({title}) {
    return <h2 className={styles.header}>{title}</h2>
}

export default function() {
    return <Subscribe to={[ContentContainer]}>
        {function({state}){
        
            let quickLinks = state.documentsUnfiltered.filter((e) => ( e.highlighted));
            let linkDisplay = (quickLinks.length > 0) ? <LinkList list={quickLinks} title={"Quick Links"} /> : null

            return <div className={styles.sidebar}>
                {linkDisplay}
            </div>
            
        }}
    </Subscribe>

}
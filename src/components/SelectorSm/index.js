import s from "./style.scss";

export default function(p) {
    let options = p.options.map(e => <option value={e.value}>{e.title}</option>);
    let mask = p.selected_label || <span>&nbsp;</span>;
    return(
        <div className={s.selector_container}>
            <div className={s.mask}>{mask}</div>
            <select onChange={(e)=>(p.changeMethod(e.target.value))} value={p.selected_value} className={s.selector}>
                {options}
            </select>
        </div>
    )
}
import style from "./style.scss";

export default function(p) {
   return <div className={`${style.bar} ${p.addStyles}`}>
        {p.children}
    </div>
}
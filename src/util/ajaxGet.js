import $ from "jquery";

export default function(query, callback) {
    let hostname = window.location.hostname ;
    $.ajax({
        url: `http://${hostname}/sites/HR/_api/web/${query}`,
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: function(data) {
            callback(data);
            
        }.bind(this)
    })
}
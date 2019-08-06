import $ from "jquery";

export default function(query, callback) {
    $.ajax({
        url: `http://${window.location.hostname}/sites/HR/_api/web/${query}`,
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: function(data) {
            callback(data);
            
        }.bind(this)
    })
}
$(function () {
    Page.initiate();
});

var Page = {
    initiate: function () {
        this.initiateParse();
        if (PAGE != "login") {
            this.initiateSidebar();
            User.check();
        }
    },
    initiateSidebar: function () {
        var file = location.pathname.substring(1);
        $("#href-" + PAGE).addClass("active");
    },
    initiateParse: function () {
        Parse.initialize("CSSA_Parse_Server");
        Parse.serverURL = 'https://parse.ucsdcssa.org/parse';
    }
}

var User = {
    check: function () {
        var currentUser = Parse.User.current();
        if (!currentUser) {
            window.location.href = "login.html";
        }
    },
    login: function (username, password) {
        Parse.User.logIn(username, password, {
            success: function(user) {
                window.location.href = "index.html";
            },
            error: function(user, error) {
                alert(error);
            }
        });
    },
    logout: function () {
        if (confirm("Are You Sure You Want to Log Out?")) {
            Parse.User.logOut();
            window.location.href = "login.html";
        }
    }
}

function ajax(obj) {
    $.ajax({
        url: obj.url,
        type: obj.type,
        data: obj.data,
        success: function (result) {
            var data = JSON.parse(result);
            if (data["error_code"] == 0) {
                obj.success(data["content"]);
            }
            else {
                if (obj.error) {
                    obj.error(data["error_code"], data["error_log"]);
                }
                else {
                    alert("Error " + data["error_code"] + ": " + data["error_log"]);
                }
            }
        },
        error: function () {
            if (obj.error) {
                obj.error(404, "Server Connection Error");
            }
            else {
                alert("Server Connection Error");
            }
        }
    });
}

"use strict";
const serve = require("serve-static");
const path = require("path");
module.exports = function (app) {
    app.use(serve(path.join(__dirname, "../../public")));
};
//# sourceMappingURL=all.js.map
if (typeof SDK === "undefined")
{ SDK = { __namespace: true }; }
SDK.REST = {
    _context: function () {
        ///<summary>
        /// Private function to the context object.
        ///</summary>
        ///<returns>Context</returns>
        if (getGlobalContext !== "undefined") {
            return GetGlobalContext();
        } else {
            if (typeof Xrm !== "undefined") {
                return Xrm.Page.context;
            } else {
                throw new Error("Context is not Avaliable");
            }
        }

    },
    _getClientUrl: function () {
        ///<summary>
        /// Private function to return the server URL from the context
        ///</summary>
        ///<returns>String</returns>
        return this._context().getClientUrl();
    },
    _ODataPath: function () {
        ///<summary>
        /// Private function to return the path to the REST endpoint.
        ///</summary>
        ///<returns>String</returns>
        return this._getClientUrl() + "/api/data/v8.2/";
    },
    _errorHandler: function (req) {
        ///<summary>
        /// Private function return an Error object to the errorCallback
        ///</summary>
        ///<param name="req" type="XMLHttpRequest">
        /// The XMLHttpRequest response that returned an error.
        ///</param>
        ///<returns>Error</returns>
        //Error descriptions come from http://support.microsoft.com/kb/193625
        if (req.status === 12029) {
            return new Error("Server connection failed.");
        }
        if (req.status === 12007) {
            return new Error("Server name unable to be resolved.");
        }
        var errorText;
        try {
            errorText = JSON.parse(req.responseText).error.message.value;
        } catch (e) {
            errorText = req.responseText;
        }
        return new Error("Error: " + req.status + ": " + req.statusText + ": " + errorText);
    }
};
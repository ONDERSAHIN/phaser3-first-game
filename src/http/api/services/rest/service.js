import HttpClient from "../../connector/http.client";
/**
 *
 */
class Service {
    constructor() {
        this._api_connector = HttpClient.getClient();
    }
}

export default Service;
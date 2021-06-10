/**
 *  @author ONDER SAHIN  <onder.sahin@meyer.com.tr>
 *  @description This class, an ADT , provides syntax sugar api url string creation
 */
class RestUrl {
    constructor(service = "", endpoint, api_version = 'api/v1') {
        this.api = [service, api_version, endpoint]
        this.api_uri = []
    }

    /**
     *
     * @return {string}
     */
    get url() {
        let api_url = this.api.concat(this.api_uri).join('/');
        this.api_uri = [];
        return api_url
    }

    /**
     *
     * @param uri
     * @return {RestUrl}
     */

    uri(uri) {
        this.api_uri.push(uri);
        return this;
    }
}

export default RestUrl;

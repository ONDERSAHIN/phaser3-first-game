import Service from "./service";

const NO_SERVICE = Symbol('NO_SERVICE');


/**
 *  @author ONDER SAHIN <onder.sahin@meyer.com.tr>
 * @description Singleton Idenfit API RestService Class
 */
class RestService extends Service{
    constructor(service_api) {
        super();
        this._service_api = service_api || NO_SERVICE;
    }

    /**
     * BASIC API CALLS DO NOT CHANGE
     */

    save(payload) {
        // console.log(payload)
        if (payload && typeof payload === 'object') {
            if (payload.id) return this.update(payload);
            return this._api_connector.post(this._service_api.url, payload)
        } else
            throw new Error('Save API call requires Payload!')
    }

    /**
     *
     * @param payload
     * @returns {AxiosPromise<any>}
     */
    update(payload) {
        if (typeof payload === 'object' && payload.id) {
            return this._api_connector.put(this._service_api.uri(payload.id).url, payload)
        } else {
            throw new Error('Update API call requires object!')
        }
    }

    /**
     * @param id
     * @returns {AxiosPromise}
     */
    remove(id) {
        if (!id) {
            throw new Error('Delete API call requires ID parameter !')
        }
        return this._api_connector.delete(this._service_api.uri(id).url)
    }

    /**
     *
     * @returns {*}
     */

    get type() {
        return this._service_api
    }

    /**
     *
     * @param value
     */
    set type(value) {
        this._service_api = value
    }
}

export default RestService


/**
 *
 * helpers.utils
 * @author : ONDER SAHIN
 * @year : 2020
 * @project : noonie-backoffice-ui
 *
 */

/**
 * @function
 * @name sortBy
 * @description This function sorts the items by field
 * @param arr
 * @param by
 * @returns {*}
 */

// TODO  : getValue helper methods should be here
// sort getValue(by)
export const sortBy = function (arr, by) {
    return arr.sort(function (a, b) {
        let nameA = a[by].toUpperCase() // ignore upper and lowercase
        let nameB = b[by].toUpperCase() // ignore upper and lowercase
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        // names must be equal
        return 0
    })
};

/**
 * @function
 * @name cloneObject
 * @description This function clones the object to target object with specific strategy
 * @param obj
 * @param to
 * @param onlyOneFieldWillBeClonedList
 * @param cloneOnlyField
 */
export const cloneObject = function (obj, to = {}, onlyOneFieldWillBeClonedList = [], cloneOnlyField = '') {
    // TODO : change
    if (!obj) return;
    let clone = to;
    for (let key in obj) {
        if (obj[key] != null && typeof (obj[key]) === "object") {
            if (Array.isArray(obj[key])) {
                let arr = [];
                for (let i = 0; i < obj[key].length; i++) {
                    if (typeof obj[key][i] === "object" && !Array.isArray(obj[key][i])) {
                        let o = Object.create(obj[key][i].__proto__);
                        for (let k in obj[key][i]) {
                            if (onlyOneFieldWillBeClonedList.indexOf(k) > -1) {
                                o[k] = obj[key][i][k][cloneOnlyField];
                            } else {
                                o[k] = obj[key][i][k];
                            }
                        }
                        arr.push(o);
                    } else {
                        arr.push(obj[key][i])
                    }
                }
                clone[key] = arr;
            } else {
                if (onlyOneFieldWillBeClonedList.indexOf(key) > -1) {
                    clone[key] = obj[key][cloneOnlyField];
                } else {
                    clone[key] = cloneObject(obj[key]);
                }
            }
        } else {
            clone[key] = obj[key];
        }
    }
    return clone;
};

/**
 * @function
 * @name cloneObject
 * @description This function clones the object to target object with specific strategy
 * @param willConvert
 * @returns {number}
 */
export const toHash = function (willConvert) {
    if (!(typeof willConvert === 'string' || typeof willConvert === 'object')) throw new Error('toHash Function : Expected String or Object, got ' + typeof willConvert);
    if (typeof willConvert === "object") {
        willConvert = JSON.stringify(willConvert, function (key, value) {
            return (value === null || value === undefined) ? "" : value;
        })
    }
    let hash = 0,
        i, chr;
    if (willConvert.length === 0) return hash;
    for (i = 0; i < willConvert.length; i++) {
        chr = willConvert.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};


/**
 * @function
 * @name generateHexColor
 * @returns {string}
 */
export const generateHexColor = function () {
    let letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    let exceptions = ['#ffffff', '#000000', '#808080', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#434343', '#666666'];
    return exceptions.includes(color.toLocaleLowerCase()) ? generateHexColor() : color;
};


/**
 *
 * @function
 * @name buildHierarchy
 * @description
 * @param units
 * @returns {Array}
 *
 */
export const buildHierarchy = function (units) {
    // let internalUnits = JSON.parse(JSON.stringify(units)) // bug fix
    let hierarchy = [];
    if (units.length > 1) {
        let rootIndex = units.findIndex(unit => {
            return unit.parent === null;
        });
        let root = units[rootIndex];
        // internalUnits.splice(rootIndex, 1); // clear the null parent from list // do not remove element
        root.children = units.filter(unit => (unit.parent || {}).id === root.id);
        let currentNode = null;
        for (let i = 0; i < units.length; i++) {
            currentNode = units[i];
            currentNode.children = units.filter(unit => (unit.parent || {}).id === currentNode.id);
        }
        hierarchy.push(root);
    } else {
        hierarchy = units;
    }
    return hierarchy;
};


/**
 *
 * @function
 * @description
 * @param item
 * @param fromArray
 * @returns {T[] | *}
 *
 */

export const removeItemFromArrayById = function (item, fromArray) {
    const index = fromArray.findIndex(arrayItem => {
        if (typeof arrayItem === 'string' || arrayItem instanceof String) {
            return arrayItem === item.id
        } else {
            if (arrayItem.id === item.id) {
                return true;
            }
        }
    });
    return fromArray.splice(index, 1);
};

/**
 * @function
 * @name convertTablePaginationtoRequestPagination
 * @description This function converts the vuetify tables pagination object to required pagination object for API call
 * @param {Object} table_pagination_object
 * @returns {Object}
 */
export const convertTablePaginationtoRequestPagination = function (
    table_pagination_object, sortAliases = null) {

    if (table_pagination_object === null || table_pagination_object === undefined) {
        throw 'convertTablePaginationtoRequestPagination method parameter can not be NULL'
    }

    let sortBy = null
    if (sortAliases) {
        sortBy = sortAliases[table_pagination_object.sortBy] ?
            sortAliases[table_pagination_object.sortBy] :
            table_pagination_object.sortBy
    }

    return table_pagination_object.descending === null ? {
        page: table_pagination_object.page - 1,
        rowsPerPage: table_pagination_object.rowsPerPage,
        descending: true,
        sortBy: 'updatedDateTime'
    } : {
        page: table_pagination_object.page - 1,
        rowsPerPage: table_pagination_object.rowsPerPage,
        descending: table_pagination_object.descending,
        sortBy: sortBy || table_pagination_object.sortBy,
    }
};


/**
 *
 * @mixin
 * @description toString methods for GraphQL syntax
 * @type {{methods: {toString()}}}
 *
 */

export const toString = function (_obj, quoteIntegers = false) {

    function arrayToString(arr, quoteIntegers) {
        let str = "[";
        for (let i = 0; i < arr.length; i++) {
            str += toString(arr[i], quoteIntegers);
            if (i !== (arr.length - 1)) {
                str += ',';
            }
        }
        str += "] ";
        return str;
    }

    // if (!Array.isArray(quoteIntegers)) throw new Error("quoteIntegers : second parameter is must bu an array");
    let objectString = ``;
    if (typeof _obj === "object") {
        objectString = "{";
        for (let key of Object.keys(_obj)) {
            objectString += key + ": ";
            if (/^\d+$/.test(_obj[key]) || typeof _obj[key] === "number") {
                quoteIntegers ? objectString += `"${_obj[key]}" ` : objectString += `${_obj[key]} `;
            } else if (typeof _obj[key] === "boolean") {
                objectString += `${_obj[key]} `;
            } else if (Array.isArray(_obj[key])) {
                objectString += arrayToString(_obj[key], quoteIntegers)
            } else {
                objectString += `"${_obj[key]}" `;
            }
        }
        objectString += "}";
        return objectString;

    } else if (typeof _obj === "string") {
        //  TODO : this method is incomplete
        if (/^\d+$/.test(_obj) || typeof _obj === "number") {
            quoteIntegers ? objectString += `"${_obj}" ` : objectString += `${_obj} `;
        } else if (typeof _obj === "boolean") {
            objectString += `${_obj} `;
        } else if (Array.isArray(_obj)) {
            objectString += arrayToString(_obj, quoteIntegers)
        } else {
            objectString += `"${_obj}" `;
        }
        return objectString;
    } else throw new Error("toString Method : " + typeof _obj + " is sended object is expected");
};

// TODO : extract sensors and eventTypes from here
/**
 * @return {string}
 */
export const OSName = () => {
    let osName = "Unknown OS";
    if (navigator.platform.indexOf("Win") !== -1) osName = "Windows";
    if (navigator.platform.indexOf("Mac") !== -1) osName = "MacOs";
    if (navigator.platform.indexOf("X11") !== -1) osName = "UNIX";
    if (navigator.platform.indexOf("Linux") !== -1) osName = "Linux";
    if (navigator.platform.indexOf("iPhone") !== -1) osName = "iOS";
    if (navigator.platform.indexOf("Android") !== -1) osName = "Android";
    return osName;
};

/**
 *
 * @type {{data(): *}}
 */

export const eventTypes = {
    BREAK_IN: 'tw-break-in',
    BREAK_OUT: 'tw-break-out',
    LUNCH_IN: 'tw-lunch-in',
    LUNCH_OUT: 'tw-lunch-out',
    DUTY_IN: 'tw-duty-in',
    DUTY_OUT: 'tw-duty-out',
    CLOCK_IN: 'tw-in',
    CLOCK_OUT: 'tw-out',
    UNKNOWN: 'help'
};

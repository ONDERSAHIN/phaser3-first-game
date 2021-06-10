import HttpStatusEventBus from '../../httpStatusEventBus'
import {DATA_INTEGRITY_VIOLATION} from '../index'
import EventBus from "../../../../../bus/event.bus";

const OPEN_BRACKET = "[";
const CLOSE_BRACKET = "]";
const SPLIT_OPERATOR = ",";
const BIND_OPERATOR = ".";

class ViolatedDataBuilder {
    constructor() {
        this.map = new Map();
        this.list = [];
    }

    add(violatedData) {
        if (violatedData.includes(BIND_OPERATOR)) {
            let meta = violatedData.split(BIND_OPERATOR);
            if (!this.map.has(meta[0])) {
                this.map.set(meta[0], new Array(meta[1].trim()));
            } else {
                this.map.get(meta[0]).push(meta[1].trim());
            }
        } else {
            this.map.set(violatedData, null);
        }
    }

    get build() {
        this.map.forEach((value, key) => {
            if (value === null) {
                this.list.push(key);
            } else {
                this.list.push({
                    nestedObjectName: key,
                    nestedObjectFieldNames: value
                });
            }
        });
        return this.list;
    }
}

function data_integration_violation() {
    HttpStatusEventBus.$on(DATA_INTEGRITY_VIOLATION.toString(), (response) => {
        let violationConstraintList = response.data.error.description || "";
        if (violationConstraintList.length !== 0) {
            if (violationConstraintList.startsWith(OPEN_BRACKET) && violationConstraintList.endsWith(CLOSE_BRACKET)) {
                let startIndex = 1;
                let closeBracketCharIndex = violationConstraintList.indexOf(CLOSE_BRACKET);
                let violatedFieldRawList = violationConstraintList.substring(startIndex, closeBracketCharIndex).split(SPLIT_OPERATOR);
                let violatedDataBuilder = new ViolatedDataBuilder();
                for (let i = 0; i < violatedFieldRawList.length; i++) {
                    violatedDataBuilder.add(violatedFieldRawList[i]);
                }
                EventBus.$emit('data-violation', violatedDataBuilder.build);
            }
        }
    });
}


export default data_integration_violation();

import HttpStatusEventBus from '../../httpStatusEventBus'
import {NO_REFRESH_TOKEN} from '../index'
import {router} from '../../../../../router/'
import {TokenUtils} from "../../../../../utils/token.utils";

function no_refresh_token(){
    HttpStatusEventBus.$on(NO_REFRESH_TOKEN.toString(),(response)=>{
        // TokenUtils.removeToken();
        // TokenUtils.removeRefreshToken();
        // router.replace({name:'start'})
    });
}
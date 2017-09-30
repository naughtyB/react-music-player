/**
 * Created by Administrator on 2017/10/1.
 */
import {CHANGE_SELECTED_KEYS} from "../action/menu"

const initialMenu={
    selectedKeys:[]
};

export const menu=(state=initialMenu,action)=>{
    switch(action.type){
        case CHANGE_SELECTED_KEYS:
            return {...state,selectedKeys:action.selectedKeys};
        default:
            return state;
    }
};

export default menu;
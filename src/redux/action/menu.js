/**
 * Created by Administrator on 2017/10/1.
 */
//改变被选项
export const CHANGE_SELECTED_KEYS="CHANGE_SELECTED_KEYS";

export const doChangeSelectedKeys=(selectedKeys)=>{
    return {
        type:CHANGE_SELECTED_KEYS,
        selectedKeys
    }
};
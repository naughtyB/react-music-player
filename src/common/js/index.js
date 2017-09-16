/**
 *
 * Created by Administrator on 2017/9/16.
 */

//主要是一些处理函数
export const transformHash=(hash)=>{
    let hashData={};
    hash.slice(1).split("&").forEach((item,index)=>{
        let arr=item.split("=");
        hashData[arr[0]]=decodeURIComponent(arr[1]);
    });
    return hashData;
};


export const timeTransform=(time)=>{
    let mins=Math.floor(time/(1000*60));
    let seconds=Math.floor(time%(1000*60)/1000);
    mins=mins<10?"0"+mins:""+mins;
    seconds=seconds<10?"0"+seconds:""+seconds;
    return mins+":"+seconds;
};

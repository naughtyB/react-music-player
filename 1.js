/**
 * Created by Administrator on 2017/10/13.
 */
/*let myObject={
    _name:"pino",
    set name(name){
        return this._name=name;
    },
    get name(){
        return this._name
    }
};

myObject.name="bender";

let newObject={
    _name:"uzi"
};

console.log(Reflect.get(myObject,"name",newObject));*/
/*let target={};
let proxy=new Proxy(target,{
    set(){
        console.log(1);
    },
    defineProperty(){
        console.log(2)
    }
});

Reflect.set(proxy,"name","bender");
console.log(proxy.name);*/


/*new Promise((resolve,reject)=>{
    resolve(new Promise((resolve,reject)=>{
        setTimeout(resolve,2000,"gg")
    }).then(res=>console.log(`内部成功${res}`)).then(res=>"asd"))
}).then(
    res=>console.log(`成功${res}`),
    err=>console.log(`失败${err}`)
);*/

/*
const p1 = new Promise((resolve, reject) => {
    resolve('hello');
})
    .then(result => result);

const p2 = new Promise((resolve, reject) => {
    resolve("gg")
})
    .then(result => result);

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(e => console.log(e));
*/
/*let thenable = {
    then: function(resolve, reject) {
        resolve(42);
        console.log("asd")
    }
};
new Promise((resolve)=>console.log(1);resolve()).then(()=>console.log(3));console.log(2)

//放在then里面的都变成异步
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
    console.log(value);  // 42
});*/


/*class RangeIterator {
    constructor(start, stop) {
        this.value = start;
        this.stop = stop;
    }

    [Symbol.iterator]() { return this; }

    next() {
        var value = this.value;
        if (value < this.stop) {
            this.value++;
            return {done: false, value: value};
        }
        return {done: true, value: undefined};
    }
}

function range(start, stop) {
    return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
    console.log(value); // 0, 1, 2
}

console.log(rage)*/

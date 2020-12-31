// ES 6 ~ 11 총 정리
// * 지원 브라우져 확인 : https://caniuse.com/
////////////////////////////// 
// ES6 ES2015

// - Class
{
    class Person {
        constructor (id, name) {
            this.id = id
            this.name = name
        }
        toString() {
            return `(${this.id}, ${this.name})`
        }
    }

    class Student extends Person {
        constructor (id, name, age) {
            super(id, name)
            this.age = age
        }
        toString() {
            return super.toString() + ' and ' + this.age
        }
    }
    new Person();
    new Student();
}
// - let, const
{
    let data = '';
    data = 123;
    const dataC = 123;
    // * dataC = "123"; // Error
}

// - Arrow Function * this 주의
{
    const arrFunc = [1, 2, 3].map(x => x * x) // 1, 4, 9
}
// - import & export
// * type="module" 사용 할 것 <script type="module"></script> 
// a.js
export const dataEx = 123;

// b.js (a.js의 dataEx를 불러옴)
import { dataEx } from "a.js";
import * as Name from "a.js";
// Name.dataEx 처럼 묶어서 사용하기 가능(Dart 유사)

// - Promise(async & await -> es8)
{
    const promiseTest = (num) => new Promise((resolve, reject) => {
            if (num > 3) resolve(num);
            else reject("err");
        });
    promiseTest(5)
        .then(val => console.log(val)) // 5
        .catch(err => console.log(err))
}

// - 구조 분해 할당
// - (1) Array
// * default value 가능
{
    let a, b, c;
    [a=1, b=2, ...c] = [1,2,3,4,5,6];
}
// - (2) Object
{
    ({ a, b } = { a: 10, b: 20 });
    console.log(a); // 10
    console.log(b); // 20
}
// - (*) 응용
{
    let metadata = {
        title: "Scratchpad",
        translations: [
        {
            locale: "de",
            localization_tags: [ ],
            last_edit: "2014-04-14T08:43:37",
            url: "/de/docs/Tools/Scratchpad",
            title: "JavaScript-Umgebung"
        }
        ],
        url: "/en-US/docs/Tools/Scratchpad"
    };

    let { title: englishTitle, translations: [{ title: localeTitle }] } = metadata;
}
// - (3) 함수
{
    function aa({a,b}){console.log(a);};
    aa({a:1,b:2});
    let aaData = {a:2,b:3};
    aa(aaData);
    let [a,b] = [1,2];
    aa({a,b});
}

// - 삼항 연산자(Dart 동일)
{
    let a3 = a === 1 ? 10 : 20;
    console.log(a3);
}

////////////////////////////// 
// ES7 ES2016

// - 제곱 연산자
{
    2**2;
    let powData = 3;
    powData **= 3; // 3*3*3
}

// - Array Includes
// indexOf 와 비슷하지만 boolean을 반환
{
    let dataIn = [12,3,4,NaN];
    dataIn.includes(12); // true
    dataIn.includes(NaN); // true
}


////////////////////////////// 
// ES8 ES2017

// - 문자열 공백 생성(패딩)
{
    console.log("test".padStart(10)); // "          test"
    console.log("test".padEnd(10)); // "test          "
}

// - Object
{
    const obj = {a:1,b:2,c:3};
    // objKey2Arr
    const objKey = Object.keys(obj); // [a,b,c]
    
    // objValue2Arr
    const objValue = Object.values(obj); // [1,2,3]

    // obj2Arr
    const obj2arr = Object.entries(obj); // [[a,1],[b,2],[c,3]]
}

// - async & await
// 
{
    let value;
    const promiseT = (x) => new Promise((res,rej) => {
        if(x < 10) res(123);
        rej('x > 10');
    });
    const promiseV = async () => {
        value = await promiseT(20).catch(_=> 20)
        console.log(value); // 20
    };
    promiseV();
    console.log(value); // undefined
}

// - Promise.all
// 비동기 모두 실행
// 3초 3초 3초 3개의 비동기 함수 실행시 9초를
// 3초만에 3개를 동시 실행 가능

{
    const promiseT1 = () => new Promise((res,rej) => setTimeout(() => res(1), 3000));
    const promiseT2 = () => new Promise((res,rej) => setTimeout(() => res(2), 3000));
    const promiseT3 = () => new Promise((res,rej) => setTimeout(() => res(3), 3000));
    
    const promisePlay = () => Promise.all([promiseT1(), promiseT2(), promiseT3()]);
    const promiseArea = async () => {
        const [a,b,c] = await promisePlay().catch(_ => ['a','b','c']);
        console.log(a,b,c); // 3초 뒤 1, 2, 3
    }
    const promiseArea2 = async () => {
        const a = await promiseT1().catch(_ => 'a');
        const b = await promiseT2().catch(_ => 'b');
        const c = await promiseT3().catch(_ => 'c');
        console.log(a,b,c); // 9초 뒤 1, 2, 3
    }
    promiseArea();
    promiseArea2();
}

////////////////////////////// 
// ES9 ES2018

// - Object rest, spread (배열 해체와 비슷)
{
    const { a, ...b } = { a: 1, b: 2, c: 3 };
    console.log(b); // { b:2, c:3 }
    const { c, d, ...e } = { d: 4, e: { f: 6 }, g: 7, h: 8 }
    console.log(e); // { e:{f:6}, g:7, h:8 }
}

// - Promise.finally : promise의 성공여부와 상관없이 마지막에 실행시킬 내용
{
    const defaultFunc = () => console.log("default Func!");
    const promiseT = () => new Promise((res,rej) => setTimeout(() => res(console.log('promiseFunc!')), 3000));
    const promisePlay = async () => await promiseT().catch(_ => console.log("ERR!")).finally(() => defaultFunc());
    promisePlay();
}

// - generator & promise
{
    async function* a(){
        yield 1;
        yield 2;
        yield 3;
    }
    a().next().next().then(v => console.log(v.value)).finally(() => console.log('finally'));
}

// - for of & Promise
{
    const forPromise = async () => {
        const arr = [1,2,3];
        const dataArr = await new Promise((res,rej) => res(arr.map(v => v**v))).catch( _ => arr).finally(() => console.log(arr));
        for await (data of dataArr) console.log(`forAwait - data : ${data}`);
    }
    forPromise();
}

////////////////////////////// 
// ES10 ES2019

// - Object.fromEntries(<-> Object.entries) 배열을 객체로
{
    const obj = {a:1, b:2, c:3};
    const enObjArr = new Object.entries(obj);
    console.log(enObjArr); // [a,1,b,2,c,3]
    const fromObj = Object.fromEntries(enObjArr);
    console.log(fromObj) // {a:1, b:2, c:3};
}

// - flat 다중 배열을 단일 배열로
{
    const arr = [[1,2], [3,[4,5],[6,[7,[8,[9]]]]]];
    const arrFlat1 = arr.flat();
    const arrFlat2 = arr.flat(2);
    const arrFlatAll = arr.flat(Infinity);
    console.log(arrFlat1);
    console.log(arrFlat2);
    console.log(arrFlatAll);
}

// - .flatMap() : 순서에 따라 중 된 배열을 모두 펼칠때까지 반복하고 새로운 배열을 반환
{
    
    const arr = [[1,2], [3,[4,5],[6,[7,[8,[9]]]]]];
    const arrFlatMap = arr.flatMap((value,index,flatArr) => {
        console.log(`value : ${value}`);
        console.log(`index : ${index}`);
        console.log(`flatArr : ${flatArr}`);
        return value;
    });
    console.log(`arrFlatMap : ${arrFlatMap}`);
}

// - trim 지우는 공백 방향
{
    '    abc    '.trim(); // 'abc'
    '    abc    '.trimStart(); // 'abc    '
    '    abc    '.trimEnd(); // '    abc'
    '    abc    '.trimRight(); // '    abc'
    '    abc    '.trimLeft(); // 'abc    '
}

// - catch(error) : error 생략
{
    try{
        throw 'ERR!';
    }
    catch{
        console.log('error 생략가능');
    }
}

// - Find Symbol Value
{
    const symbolKey = Symbol('jamessss');
    console.log(symbolKey);
    console.log(symbolKey.description);
}

////////////////////////////// 
// ES11 ES2020

// - Optional Chaining ?.(Dart와 유사)
{
    class MyClass{}
    let my;
    try{
        console.log(my.getData()); // err
    }
    catch{
        console.log('err');
    }
    console.log(my?.getData()); // undefined
}

// - Nullish coalescing Operator ?? (Dart와 유사)
{
    let my;
    console.log( my?.data ?? "my에 아무것도 없음");
}

// - globalThis (웹) 언제나 window
// * 이전까지는 실행 환경에 따라 window 사용이 달랐음

{
    console.log(globalThis === window); // true
}
// - Dynamic import : import는 Promise를 사용하며 비동기 객체를 반환하므로 비동기 처리 가능해짐
{
    import("./myModule.js")
        .then( m => console.log(m) )
        .catch( _ => console.log('err') );

    // async & await
    (
        async () => { 
            try { 
                const module = await import("./myModule.js"); 
            } 
            catch{ 
                } 
            }
        )()
}

// - BigInt : 2^53-1 보다 큰 Int 값 사용할 경우
// * BigInt 사이만 연산 가능 / n 을 사용하여 표현
{
    const bigInt1 = 9007199254740999n
    const bigInt2 = BigInt(9007199254740998)
    console.log(bigInt1 + bigInt2);
    console.log(bigInt1+123); // Type ERR !
}

// - String.prototype.matchAll
// * indexOf, exec와 유사하지만 값을 찾고 이터레이터를 반환
{
    const value = 'abcdefg';
    const [findValue1] = [...value.matchAll('cde')];
    console.log(findValue1); // ["cde", index: 2, input: "abcdefg", groups: undefined]

    const [findValue2] = [...value.matchAll('ayk')];
    console.log(findValue2); // undefined
}

// - Promise.allSettled
// * 기존 Promise.all 은 하나만 실패해도 reject 되었지만 allSettled 사용하면 멈추지 않음
{
    // 기존 Promise.all
    const promiseT1 = () => new Promise((res,rej) => res(123));
    const promiseT2 = () => new Promise((res,rej) => {throw 'err';});
    const promiseT3 = () => new Promise((res,rej) => res(321));

    const promisePlay = () => Promise.all([promiseT1(), promiseT2(), promiseT3()]).then(v => v).catch(_ => "PromiseAllERR!");
    const promiseArea = async () => {
        const data = await promisePlay();
        console.log( data ); // PromiseAllERR!
    }
    promiseArea();

    // Promise.allSettled
    const promisePlay2 = () => Promise.allSettled([promiseT1(),promiseT2(),promiseT3(),]).catch(_ => "ERR 2 !!");
    promiseArea2 = async () => {
        const data = await promisePlay2();
        console.log(`data : ${data}`);
        console.log(`data0 : status - ${data[0].status} value - ${data[0].value} reason : ${data[0].reason}`);
        console.log(`data1 : status - ${data[1].status} value - ${data[1].value} reason : ${data[1].reason}`);
        console.log(`data2 : status - ${data[2].status} value - ${data[2].value} reason : ${data[2].reason}`);

        const [ a = {status, value, reason}, b = {status, value, reason}, c = {status, value, reason} ] = await promisePlay2();
        console.log(a);
        console.log(b);
        console.log(c);
    }
    promiseArea2();
}




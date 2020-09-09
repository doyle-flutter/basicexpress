
    const data = `<p>안녕하세요, 불러온 태그입니다 :)</p>`;
    console.log(data);
    let home = new Vue({
        el: "#home",
        data:{txt:data}
    });

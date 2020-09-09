let naviHeight = '50px';
    let nav = new Vue({
        el : "#vue-nav",
        data: {
            title:'NavigationBar',
            wrapperCss:{
                height: naviHeight
            },
            contentsCss:{
                color: 'red',
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                lineHeight: naviHeight,
                backgroundColor: '#ddd',
            },
            backBtnCss:{
                display:'inline-block',
                margin: '0 10px 0 10px',
                cursor: 'pointer'
            },
            navTitleCss:{
                display:'inline-block',
                margin: '0 0 0 10px',
            }
        },
        methods: {
            navBack: function() {
                window.history.back();
            }
        }
    });

try{
    james.postMessage('Hi ! webVuw !',"http://192.168.0.2:3000");
}
catch(e){

}
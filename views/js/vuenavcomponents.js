let naviHeight = '50px';
    let nav = new Vue({
        el : "#vue-nav",
        data: {
            title:'vuenavcomponents.js에서 생성한 NavigationBar',
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
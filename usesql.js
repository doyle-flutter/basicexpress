class UseSQL{
    static createValue({title, des}){
        if(title == undefined || des == undefined) throw "ARG ERR!";
        // if(arguments.length > 3) throw "ERR : LENGTH";
        // length 비교
        let _results = [];
        _results.push(title);
        _results.push(des);
        return _results;
    }

}

module.exports = UseSQL;
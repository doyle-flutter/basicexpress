class UseSQL{
    static createValue({title, des}){
        if(title == undefined || des == undefined) throw "ARG ERR!";
        let _results = [];
        _results.push(title);
        _results.push(des);
        return _results;
    }
    
    static updateValue = ({title,des,id}) => [title,des,id];
    
    static deleteValue = ({id}) => [id];

}

module.exports = UseSQL;
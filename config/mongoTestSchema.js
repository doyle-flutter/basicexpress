const mongo = require('./mongoosedb.js');

const testSchema = new mongo.Schema(
    {
        key : {type : String, required: true},
    },
    {
        collection : 'test'
    }
);

testSchema.statics.findAll = function () {
    return this.find({});
};
// 구조화된 스키마로 넣기 위해 기존 메서드를 오버라이딩
testSchema.statics.create2 = function (value) {
    const test = new this(value);
    return test.save();
};

const TestModel = mongo.model('Test', testSchema);

module.exports = TestModel;
const express = require('express'),
    router = express.Router(),
    graphql = require('graphql'),
    GraphqlQuery = graphql.graphql,
    {GraphQLSchema,GraphQLObjectType, GraphQLString, GraphQLInt } = graphql,
    // GraphQL 서버 패키지 사용시
    {graphqlHTTP} = require('express-graphql'),
    mysql2 = require('mysql2/promise'),
    sql = require('../sql.js');
    let connection;

router.use(async (req,res,next) => {
    connection = await mysql2.createConnection({user: 'root',password: 'abc123456',database: 'dbs',});
    next();
})

// 반환(결과) 데이터 타입
const dType = new GraphQLObjectType({
    name: "dType",
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        des: { type: GraphQLString },
        created: { type: GraphQLString },
    }
});

// 스키마 : 어떻게 요청했을 때 어떤 데이터를 줄 것 인가?
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'tables',
        fields: {
            hello: {
                args: { 
                    targetId: { type: GraphQLInt }
                },
                type: dType,
                resolve: async (_,{targetId},{req},___) => {
                    console.log(`req : ${req.headers['user-agent']}`);
                    console.log(`req : ${req.headers['content-type']}`);
                    console.log(`req : ${req.headers['authorization']}`);
                    let result = await connection.execute(sql.readTargetSQL({id:targetId}));
                    return result[0][0];
                }
            },
        },
    }),
});

// Server 사용
// query example : query { hello(targetId:1){ id title } }
router.use('/', graphqlHTTP({
    schema:schema,
    graphiql: true,
}));

router.get('/data', async (req,res) => {
    let reqQuery = req.query['query'];

    //query example
    var query = `{ 
        hello(targetId:31) {
            id
            title
        }
    }`; 
    // request example
    // http://localhost:3000/graphqlserver/data?query={hello(targetId:1){id%20title}}
    if(reqQuery == undefined) return res.json('non query ERR !');
    if(reqQuery[0] != '{' || reqQuery[reqQuery.length-1] != '}') return res.json('query type ERR !');    
    GraphqlQuery(schema, reqQuery).then(async (result) => {
        res.json(result);
    });
});

// Server 사용
// query example : query { hello(targetId:1){ id title } }
router.use('/',graphqlHTTP((req,res) => {
    return ({
        schema:schema,
        graphiql: true,
        context:{req,res}
    });
}));

module.exports = router;
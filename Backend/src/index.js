require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const cors = require('cors');

const app = new Koa();
const router = new Router();
const api = require('./api');
const bodyParser = require('koa-bodyparser');
const { jwtMiddleware } = require('lib/token');
const mongoose = require('mongoose');

app.use(bodyParser()); // 바디파서 적용, 라우터 적용코드보다 상단에 있어야합니다.
app.use(cors());
app.use(jwtMiddleware);

mongoose.Promise = global.Promise;// Node 의 네이티브 Promise 사용
// mongo db 연결
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(
    (response) => {
        console.log('Success Mongo Connect');
    }
).catch( e => {
    console.log(e);
});


const port = process.env.PORT || 4000;

// ctx = req
// next = callback
router.use('/api', api.routes());// api 라우트를 /api 경로 하위 라우트로 설정

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('heurm server is listening to port '+port);
});
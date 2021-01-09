import Router from 'koa-router'

const steam = new Router()
steam.prefix('/oatuh/steam')

steam.get('/', async (ctx, next) => {

})

steam.post('/redirect', async (ctx, next) => {

})


module.exports = steam

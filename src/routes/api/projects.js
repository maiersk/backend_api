import Router from 'koa-router'
import { data, err, msg } from '../../lib/res_msg'
import { Project } from '../../models'

const projects = new Router()
projects.prefix('/projects')

projects.get('/', async (ctx, next) => {
  const { page = 0, count = 10 } = ctx.query

  try {
    if (page < 0 || count < 0) { throw new Error('negative number') }
  
    let _project = await Project.findAndCountAll({
      where: query ? { title: { [Op.like]: `%${query}%` } } : {},
      limit: +count,
      offset: page !== 0 ? page * +count : page
    })

    ctx.body = data(_project.rows, {
      page: +page,
      total: _project.count,
      total_pages: Math.floor((_project.count + +count - 1) / +count)
    })
  } catch (error) {
    ctx.body = err(error.message)
  }
})

projects.get('/:id', async (ctx, next) => {
  const id = ctx.params.id

  try {
    const project = await Project.findOne({
      where: { id }
    })
    if (project) {
      ctx.body = data(project)
    } else {
      throw new Error('not find')
    }
  } catch (error) {
    ctx.body = err(error.message)
  }
})

projects.post('/', async (ctx, next) => {
  const {
    name,
    url,
    desction,
    content,
    startedTime,
    endedTime
  } = ctx.request.body

  try {
    const project = await Project.build({
      name, url, desction, content, startedTime, endedTime
    })
    await project.save()

    ctx.body = data(project)
  } catch (error) {
    ctx.body = err(error.message)
  }
})

projects.put('/:id', async (ctx, next) => {
  const id = ctx.params.id
  const {
    name,
    url,
    desction,
    content,
    startedTime,
    endedTime
  } = ctx.request.body

  try {
    const project = await Project.update({
      name, url, desction, content, startedTime, endedTime
    }, {
      where: { id }
    })

    ctx.body = data(project)
  } catch (error) {
    ctx.body = err(error.message)
  }
})

projects.delete('/:id', async (ctx, next) => {
  const id = ctx.params.id

  try {
    await Project.destroy({
      where: { id }
    })

    ctx.body = msg('deleted')
  } catch (error) {
    ctx.body = err(error.message)
  }
})

module.exports = projects

import * as userServices from './services'
import * as InteractionServices from '../interaction/services'
import * as validators from './validators'

const name = 'user'

export const plugin = {
  name,

  async register (server) {
    server.cache({ segment: name })

    server.route([
      {
        method: 'GET',
        path: `/${name}/echo`,
        options: {
          tags: ['api'],
          notes: 'echo'
        },
        handler: async(request, h) => {
          const data = { success: true }
          return h.response({ data })
        }
      },
      {
        method: 'GET',
        path: `/${name}`,
        options: {
          tags: ['api'],
          notes: 'list of users excluding current user'
        },
        handler: async(request, h) => {
          const { base_user_id } = request.headers
          const data = await userServices.getUsers(request.query, base_user_id)
          return h.response({ data })
        }
      },
      {
        method: 'GET',
        path: `/${name}/{id}`,
        options: {
          tags: ['api'],
          notes: 'get user detail with current user interaction info by given id'
        },
        handler: async(request, h) => {
          let currentUserInteraction
          const { base_user_id: baseUserId } = request.headers
          const { id } = request.params
          
          const user = await userServices.getUser(id)
          
          if (baseUserId) {
            const baseUser = await userServices.getUser(baseUserId)
            currentUserInteraction = await InteractionServices.getInteraction(baseUser, user)
          }
          
          const data = {
            user,
            currentUserInteraction
          }
          
          return h.response({ data })
        }
      },
      {
        method: 'POST',
        path: `/${name}/like`,
        options: {
          tags: ['api'],
          notes: 'like a user',
          // validate: validators.update
        },
        handler: async(request, h) => {
          const { base_user_id: baseUserId } = request.headers
          const { targetUserId } = request.payload
          const result = await InteractionServices.reactUser(baseUserId, targetUserId, 'like')
          return h.response(result)
        }
      },
      {
        method: 'POST',
        path: `/${name}/pass`,
        options: {
          tags: ['api'],
          notes: 'pass a user',
          // validate: validators.update
        },
        handler: async(request, h) => {
          const { base_user_id: baseUserId } = request.headers
          const { targetUserId } = request.payload
          const result = await InteractionServices.reactUser(baseUserId, targetUserId, 'pass')
          return h.response(result)
        }
      }
    ])
  }
}

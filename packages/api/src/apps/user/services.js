import { models } from '../../db'

const { 
  User: UserModel
} = models

export const getUsers = async(params, baseUserId= null) => {
  try {
    const { limit = 10, offset = 0 } = params
    let userQuery = UserModel
      .query()
      .select()
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .offset(offset)
    if (baseUserId) {
      userQuery = userQuery.whereNot('id', baseUserId)
    }

    return await userQuery

  } catch (err) {
    console.log(err.message)
    throw err
  }
}

export const getUser = async(id) => {
  try {
    return await UserModel.query().findById(id)
  } catch (err) {
    console.log(err.message)
    throw err
  }
}

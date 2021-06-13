import { transaction } from 'objection'
import db, { models } from '../../db'
import { getUser } from '../user/services'

const { 
  Interaction: InteractionModel
} = models

const REACT_TYPES = ['like', 'pass']

export const getInteraction = async(baseUser, targetUser) => {
  try {
    
    const interactionObject = {
      'baseUser': baseUser.id,
      'targetUser': targetUser.id
    }
    
    return await InteractionModel.query().findOne(interactionObject)
    
  } catch (err) {
    console.log(err.message)
    throw err
  }
}

export const reactUser = async(baseUserId, targetUserId, reaction) => {
  try {
    if (!REACT_TYPES.includes(reaction)) {
      // TODO: throw
      return false
    }
    
    const baseUser = getUser(baseUserId)
    const targetUser = getUser(targetUserId)
    
    if (!baseUser || !targetUser) {
      // TODO: throw
      return false
    }
    
    let interaction = getInteraction(baseUser, targetUser)
    
    const tx = await transaction.start(db)
    if (!interaction) {
      interaction = await this.model.query(tx).insert(
        {
          'baseUser': baseUser.id,
          'targetUser': targetUser.id,
          reaction
        }
      )
    } else {
      interaction = await InteractionModel.query().patchAndFetch({
        reaction
      })
    }
    
    return interaction
    
  } catch (err) {
    console.log(err.message)
    throw err
  }
}

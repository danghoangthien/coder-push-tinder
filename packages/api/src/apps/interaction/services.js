import { transaction } from 'objection'
import db, { models } from '../../db'
import { getUser } from '../user/services'

const { 
  Interaction: InteractionModel
} = models

const REACTION_TYPES = ['like', 'pass']

export const getInteraction = async(baseUser, targetUser) => {
  try {
    
    const interactionObject = {
      'baseUser': baseUser.id,
      'targetUser': targetUser.id
    }
    
    return await InteractionModel.query().findById([baseUser.id, targetUser.id])
  } catch (err) {
    console.log('[getInteraction]' + err.message)
    throw err
  }
}

export const reactUser = async(baseUserId, targetUserId, reaction) => {
  const tx = await transaction.start(db)
  try {
    if (!REACTION_TYPES.includes(reaction)) {
      // TODO: throw
      return false
    }
    console.log('baseUserId', baseUserId, 'targetUserId', targetUserId)
    const baseUser = await getUser(baseUserId)
    const targetUser = await getUser(targetUserId)
    console.log('baseUser', baseUser, 'targetUser', targetUser)
    if (!baseUser || !targetUser) {
      // TODO: throw
      return false
    }
    
    let interaction = await getInteraction(baseUser, targetUser)
    
    if (!interaction) {
      interaction = await InteractionModel.query(tx).insert(
        {
          'baseUser': baseUser.id,
          'targetUser': targetUser.id,
          reaction
        }
      )
    } else {
      interaction = await InteractionModel.query(tx).patchAndFetchById(
        [interaction.baseUser, interaction.targetUser],
        {
          reaction
        }
      )
    }

    await tx.commit()
    return interaction
    
  } catch (err) {
    await tx.rollback()
    console.log('[reactUser]' + err.message)
    throw err
  }
}

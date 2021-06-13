const faker = require('faker');
const table = 'User'
import { ObjectId } from 'bson'
export const Key = () => new ObjectId().toHexString()

const createUser = () => {
  const gender = faker.random.arrayElement(['male', 'female', 'other'])
  const title = faker.random.arrayElement(['mr', 'ms', 'mrs', 'miss', 'dr'])
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  return {
    id: Key(),
    firstName,
    lastName,
    title,
    gender,
    email: `${firstName}.${lastName}@${faker.internet.domainName()}`,
    dateOfBirth: faker.date.between('1960-01-01', '2003-01-01'),
    registerDate: faker.date.between('2021-06-01', '2021-06-12'),
    phone: faker.phone.phoneNumber(),
    picture: faker.image.avatar(),
    location: faker.address.streetAddress()
  }
}

const createUsers= (numUsers = 20) => {
    return Array.from({length: numUsers}, createUser)
}

exports.seed = async knex => {
  const initialUsers = createUsers()
  const countDBUsers = await knex(table).count('id as CNT')
  if (parseInt(countDBUsers[0].CNT) === 0) {
    return Promise.all(
      initialUsers.map(user => {
        return knex(table).insert(user)
      })
    )
  }
}

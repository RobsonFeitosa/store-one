import { define } from 'typeorm-seeding'
import User from '../entities/User'

define(User, () => {
  const user = new User()
  const firstName = 'jonh'
  const lastName = 'doe'

  user.name = `${firstName} ${lastName}`
  user.email = 'jonh@email.com'
  user.password = '123123'

  return user
})

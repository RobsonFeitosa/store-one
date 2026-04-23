import { define } from 'typeorm-seeding'
import Settings from '../entities/UserSettings'

define(Settings, () => {
  const setting = new Settings()

  setting.level = 1
  setting.actived = true

  return setting
})

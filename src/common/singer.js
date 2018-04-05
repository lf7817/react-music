import { AVATAR_ADDRESS } from '@/constant'

class Singer {
  constructor ({name, id}) {
    this.id = id
    this.name = name
    this.avatar = this.getAvatarUrl(id)
  }

  getAvatarUrl (id) {
    return AVATAR_ADDRESS.replace(/\{id\}/, id)
  }
}

export default Singer

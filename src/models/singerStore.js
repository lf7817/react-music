import { observable, runInAction, action } from 'mobx'
import { getSingerList } from '@/api/singer'
import { ERR_OK, HOT_NAME, HOT_SONG_NUM } from '@/constant'
import Singer from '@/common/singer'

class SingerStore {
  @observable singers = []
  @observable scrollY = 0
  @observable anchorIndex = 0

  @action('设置scroll滚动的位置')
  setPosition = (scrollY, anchorIndex) => {
    this.scrollY = scrollY
    this.anchorIndex = anchorIndex
  }

  @action('获取歌手列表')
  requestSingerList = async () => {
    try {
      const res = await getSingerList()
      if (res.code === ERR_OK) {
        runInAction(() => {
          this.singers = this._normalizeSinger(res.data.list)
        })
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  _normalizeSinger (list) {
    let dict = {
      hot: {
        title: HOT_NAME,
        items: []
      }
    }

    list.forEach((item, index) => {
      if (index < HOT_SONG_NUM) {
        dict.hot.items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      }

      if (!dict[item.Findex]) {
        dict[item.Findex] = {
          title: item.Findex,
          items: []
        }
      }
      dict[item.Findex].items.push(new Singer({
        name: item.Fsinger_name,
        id: item.Fsinger_mid
      }))
    })

    const ret = Object.keys(dict)
      .sort((a, b) => {
        return a.charCodeAt(0) - b.charCodeAt(0)
      })
      .reduce((arr, key, index, oldArr) => {
        const item = dict[key]
        if (item.title.match(/[a-zA-Z]/)) {
          arr.push(item)
        }
        if (index === oldArr.length - 1) {
          arr.unshift(dict.hot)
        }
        return arr
      }, [])

    return ret
  }
}

export default SingerStore

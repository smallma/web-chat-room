import { mutations } from "../../src/store/ws"

describe("test store ws mutation", () => {
  it("test setWsRes", () => {
    const post = {
      type: 1,
      msgid: 1,
      uuid: 'test 1',
      date: 'test 2',
      msg: 'test 3',
      users: [],
      selectAvatarId: 1,
      nickname: 'User 1'
    }

    const post2 = {
      type: 2,
      msgid: 2,
      uuid: 'test 1',
      date: 'test 2',
      msg: 'test 3',
      users: [],
      selectAvatarId: 3,
      nickname: 'User 1'
    }

    let state = {
      wsRes: []
    };

    mutations.setWsRes(state, post)
    mutations.setWsRes(state, post2)

    expect(state.wsRes).toEqual([post, post2])
  })
})
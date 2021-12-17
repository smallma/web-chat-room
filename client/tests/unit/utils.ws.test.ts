// import { mount, shallowMount } from '@vue/test-utils';
import mixinWebsocket from '../../src/utils/ws.compotition'


// function websockemessage(receiveMsg:receiveMsg, cb:(msg:receiveMsgData) => void):void {
//   const msg:receiveMsgData = JSON.parse(receiveMsg.data);
//   if (typeof cb === 'function') {
//     cb(msg);
//   }
// }

interface user {
  nickname: string;
}

interface receiveMsgData {
  type: number;
  msgid: number;
  uuid: string;
  date: string;
  msg: string;
  users: Array<user>;
  selectAvatarId: number;
  nickname: string;
}

interface receiveMsg {
  data: string;
  [propName: string]: any;
}


describe('compositions', () => {
  it('test compositions', async () => {
    let actual;

    const fakeReiveMsg = {
      data: '{"type": 1,"msgid": 123,"uuid": "1234","date": "00:05","msg": "Test","users": [],"selectAvatarId": 3,"nickname": "User 4"}'
    };

    const fakeFn = (msg:receiveMsgData) => {
      actual = msg;
    };

    const expected =  {
      type: 1,
      msgid: 123,
      uuid: '1234',
      date: '00:05',
      msg: 'Test',
      users: [],
      selectAvatarId: 3,
      nickname: 'User 4'
    }

    mixinWebsocket.websockemessage(fakeReiveMsg, fakeFn);

    expect(actual).toMatchObject(expected)
  });
})

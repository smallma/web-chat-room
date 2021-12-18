// import { mount, shallowMount } from '@vue/test-utils';
import ws from '../../src/utils/ws';
import mixinWebsocket from '../../src/utils/ws'


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
  
  // it('test compositions', async () => {
  //   let mockWs = mixinWebsocket;

  //   mockWs.initWebsocket = () => {
  //     ws = {
  //       send: (msg:string) => {
  //         testValue = msg;
  //       }
  //     }
  //   };

  //   mockWs.websockemessage = () => {
  //     return testValue;
  //   }

  //   mockWs.websocketsend = (msg:string) => {
  //     return msg;
  //   }

  //   jest.mock('../../src/utils/ws', () => mockWs)
  //   const { initWebsocket, websocketsend, websockemessage } = require('../../src/utils/ws');
    
  //   initWebsocket();
  //   websocketsend('test')
  //   const excepted = websockemessage();

  //   console.log('excepted: ', excepted);
  //   // expect(websocketsend('test')).toBe('test')
  //   expect(1).toBe(1)
  // });
})

import { expect } from 'chai';
import { 
  getDate,
  handleBroadcastMsg,
  handleTypeJoinMsg,
  handleTypeChatMsg,
  handlReceiveMsg,
  // createWs,
  // handleWssOpen,
  // handleWssClose,
  transferToJsonMsg,
  // handleWssConnection
} from '../src/app';

describe('getDate', function() {
  it('test getDate', function() {
    const result = getDate();
    const date = new Date();
    const validateData = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    expect(result).equal(validateData);
  });
});

describe('handleBroadcastMsg', function() {
  it('test handleBroadcastMsg', function() {
    let result:Array<String> = [];
    const fakeWss = {
      clients: [
        {
          send: function (msg:string) {
            result.push(msg)
          }
        }
      ],
    }
    const validateData = [
      'test'
    ];

    handleBroadcastMsg(fakeWss, 'test');
    expect(result).deep.equal(validateData);
  });
});

let users: { nickname: string; }[] = [];
describe('handleTypeJoinMsg', function() {
  it('test output is correct', function() {
    const inputData = {
      type: 1,
      nickname: 'test1',
      uuid: 'uuid123',
      selectAvatarId: 100
    };

    users.push({
      nickname: inputData.nickname,
    });

    const predict = {
      type: 1,
      uuid: inputData.uuid,
      msg: inputData.nickname + ' join chat room',
      users: users,
      selectAvatarId: inputData.selectAvatarId,
      nickname: inputData.nickname
    };

    const result = handleTypeJoinMsg(inputData);

    expect(result.type).equal(predict.type);
    expect(result.uuid).equal(predict.uuid);
    expect(result.msg).equal(predict.msg);
    expect(result.users).deep.equal(predict.users);
    expect(result.selectAvatarId).equal(predict.selectAvatarId);
    expect(result.nickname).equal(predict.nickname);
  });
});


describe('handleTypeChatMsg', function() {
  it('test output is correct', function() {
    const inputData = {
      type: 2,
      nickname: 'test2',
      msg: 'hello',
      uuid: 'uuid1234',
      selectAvatarId: 1000
    };

    
    const predict = {
      type: 2,
      uuid: inputData.uuid,
      msg: inputData.msg,
      users: users,
      selectAvatarId: inputData.selectAvatarId,
      nickname: inputData.nickname
    };

    const result = handleTypeChatMsg(inputData);

    expect(result.type).equal(predict.type);
    expect(result.uuid).equal(predict.uuid);
    expect(result.msg).equal(predict.msg);
    expect(result.users).deep.equal(predict.users);
    expect(result.selectAvatarId).equal(predict.selectAvatarId);
    expect(result.nickname).equal(predict.nickname);
  });
});

describe('handlReceiveMsg', function() {
  it('test type 0 output', function() {
    const inputData0 = {
      type: 0,
      nickname: 'test1',
      uuid: 'uuid123',
      selectAvatarId: 100
    };

    const predict0 = {
    };
    
    const result0 = handlReceiveMsg(inputData0);
    expect(result0).deep.equal(predict0);
  });

  it('test type 1 output', function() {
    const inputData1 = {
      type: 1,
      nickname: 'test1',
      uuid: 'uuid123',
      selectAvatarId: 100
    };

    users.push({
      nickname: inputData1.nickname,
    });

    const predict1 = {
      type: 1,
      uuid: inputData1.uuid,
      msg: inputData1.nickname + ' join chat room',
      users: users,
      selectAvatarId: inputData1.selectAvatarId,
      nickname: inputData1.nickname
    };

    const result1 = handlReceiveMsg(inputData1);
    expect(result1.type).equal(predict1.type);
    expect(result1.uuid).equal(predict1.uuid);
    expect(result1.msg).equal(predict1.msg);
    expect(result1.users).deep.equal(predict1.users);
    expect(result1.selectAvatarId).equal(predict1.selectAvatarId);
    expect(result1.nickname).equal(predict1.nickname);
  });

  it('test type 2 output', function() {
    const inputData2 = {
      type: 2,
      nickname: 'test2',
      msg: 'hello',
      uuid: 'uuid1234',
      selectAvatarId: 1000
    };

    const predict2 = {
      type: 2,
      uuid: inputData2.uuid,
      msg: inputData2.msg,
      users: users,
      selectAvatarId: inputData2.selectAvatarId,
      nickname: inputData2.nickname
    };

    const result2 = handlReceiveMsg(inputData2);
    expect(result2.type).equal(predict2.type);
    expect(result2.uuid).equal(predict2.uuid);
    expect(result2.msg).equal(predict2.msg);
    expect(result2.users).deep.equal(predict2.users);
    expect(result2.selectAvatarId).equal(predict2.selectAvatarId);
    expect(result2.nickname).equal(predict2.nickname);
  });
});

describe('transferToJsonMsg', function() {
  it('test transferToJsonMsg undefined', function() {
    const result = transferToJsonMsg('');

    expect(result).equal(undefined);
  });

  it('test transferToJsonMsg receiveMsg type', function() {
    const result = transferToJsonMsg('{"type":1,"nickname":"Nickname","selectAvatarId":1,"uuid":"1639754682419-72473"}');
    const predict = {
      "type":1,
      "nickname":"Nickname",
      "selectAvatarId":1,
      "uuid":"1639754682419-72473"
    };

    expect(result).deep.equal(predict);
  });
});

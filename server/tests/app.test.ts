import { expect } from 'chai';
import { 
  getDate,
  handleServerOpen,
  // handleServerError,
  // handleServerClose,
  // handleBroadcastMsg,
  handleType1Msg,
  handleType2Msg,
  handlReceiveMsg,
  // createWs,
  // handleWssOpen,
  // handleWssClose,
  // handleWssConnection
} from '../src/app';

describe('getDate', function() {
  it('test getDate', function() {
    const result = getDate();
    const date = new Date();
    const validateData = `${date.getHours()}:${date.getMinutes()}`;

    expect(result).equal(validateData);
  });
});

let users = [];

describe('handleType1Msg', function() {
  it('test handleType1Msg', function() {
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

    const result = handleType1Msg(inputData);

    expect(result.type).equal(predict.type);
    expect(result.uuid).equal(predict.uuid);
    expect(result.msg).equal(predict.msg);
    expect(result.users).deep.equal(predict.users);
    expect(result.selectAvatarId).equal(predict.selectAvatarId);
    expect(result.nickname).equal(predict.nickname);
  });
});


describe('handleType2Msg', function() {
  it('test handleType2Msg', function() {
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

    const result = handleType2Msg(inputData);

    expect(result.type).equal(predict.type);
    expect(result.uuid).equal(predict.uuid);
    expect(result.msg).equal(predict.msg);
    expect(result.users).deep.equal(predict.users);
    expect(result.selectAvatarId).equal(predict.selectAvatarId);
    expect(result.nickname).equal(predict.nickname);
  });
});

describe('handlReceiveMsg', function() {
  it('test handlReceiveMsg', function() {
    const inputData1 = {
      type: 1,
      nickname: 'test1',
      uuid: 'uuid123',
      selectAvatarId: 100
    };

    const inputData2 = {
      type: 2,
      nickname: 'test2',
      msg: 'hello',
      uuid: 'uuid1234',
      selectAvatarId: 1000
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

    const predict2 = {
      type: 2,
      uuid: inputData2.uuid,
      msg: inputData2.msg,
      users: users,
      selectAvatarId: inputData2.selectAvatarId,
      nickname: inputData2.nickname
    };

    const result1 = handlReceiveMsg(inputData1);
    expect(result1.type).equal(predict1.type);
    expect(result1.uuid).equal(predict1.uuid);
    expect(result1.msg).equal(predict1.msg);
    expect(result1.users).deep.equal(predict1.users);
    expect(result1.selectAvatarId).equal(predict1.selectAvatarId);
    expect(result1.nickname).equal(predict1.nickname);

    const result2 = handlReceiveMsg(inputData2);
    expect(result2.type).equal(predict2.type);
    expect(result2.uuid).equal(predict2.uuid);
    expect(result2.msg).equal(predict2.msg);
    expect(result2.users).deep.equal(predict2.users);
    expect(result2.selectAvatarId).equal(predict2.selectAvatarId);
    expect(result2.nickname).equal(predict2.nickname);
  });
});
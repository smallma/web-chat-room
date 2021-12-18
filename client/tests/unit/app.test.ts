import { mount, shallowMount } from '@vue/test-utils';
import App from "../../src/App.vue";


describe('Chatroom.vue', () => {

  it('test method updateLoginInfo',() => {
    process.env.VUE_APP_WS_URL = 'ws://localhost:8001';

    const actual = {
      nickname: 'User',
      uuid: 2133,
      selectAvatarId: 10,
    };

    const wrapper = shallowMount(App, {})
    wrapper.vm.sendMsg = function():void {
    };

    wrapper.vm.updateLoginInfo(actual);

    expect(wrapper.vm.injectUser).toMatchObject(actual)
    expect(wrapper.vm.injectStep).toBe(1)
  });
})

describe('Chatroom.vue', () => {

  it('test method updateLoginInfo',() => {
    process.env.VUE_APP_WS_URL = 'ws://localhost:8001';

    const actual = {
      type: 1,
      msgid: 1,
      uuid: 'test',
      date: 'test',
      msg: 'test',
      users: [],
      selectAvatarId: 1,
      nickname: 'test',
    };

    const wrapper = mount(App, {})
    wrapper.vm.setWsRes(actual);

    console.log('wrapper: ', wrapper.vm.injectWsRes);
    expect(wrapper.vm.injectWsRes).toMatchObject([actual])
  });
})
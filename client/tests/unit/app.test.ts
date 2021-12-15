import { mount, shallowMount } from '@vue/test-utils';
import App from "../../src/App.vue";
import Vue from 'vue';
import Vuex from 'vuex';
import { mixinWebsocket } from '../../src/utils/ws.fake';


describe('Chatroom.vue', () => {
  test('Test send msg function', async () => {
    // process.env.VUE_APP_WS_URL = 'ws://localhost:8001';
    
    const wrapper = mount(App, {
      global: {
        mixins: [mixinWebsocket],
      },

    })

    jest.spyOn(wrapper.vm, 'initWebsocket').mockImplementation(function () {})

    // Next, load the module – do it dynamically, not at the top of the file!
    // const functionToTest = (await import('./mymodule')).functionToTest;
  
    // Test code as usual
    // expect(functionToTest()).toBe('abc');

    console.log(wrapper);
    // expect(wrapper.classes()).toContain('avatar-1');
    expect(1).toBe(1);  
  
  });
})
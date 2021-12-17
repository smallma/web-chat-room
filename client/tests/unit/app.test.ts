import { mount, shallowMount } from '@vue/test-utils';
import App from "../../src/App.vue";


describe('Chatroom.vue', () => {
  it('my test', async () => {
    // process.env.VUE_APP_WS_URL = 'ws://localhost:8001';
    process.env.VUE_APP_WS_URL = 'ws://localhost:8001';

    const wrapper = mount(App, {

    })

    

    // jest.spyOn(wrapper.vm, 'initWebsocket').mockImplementation(function () {})
    // jest.spyOn(wrapper.vm, 'initWebsocket').mockImplementation(() => function() {})
    // jest.spyOn(wrapper.vm, 'ws').mockImplementation(() => function() {})
    // jest.spyOn(wrapper.vm, 'initWebsocket', 'empty');

    // Next, load the module – do it dynamically, not at the top of the file!
    // const functionToTest = (await import('./mymodule')).functionToTest;
  
    // Test code as usual
    // expect(functionToTest()).toBe('abc');

    console.log(wrapper);
    // expect(wrapper.classes()).toContain('avatar-1');
    expect(1).toBe(1);  
  
  });
})
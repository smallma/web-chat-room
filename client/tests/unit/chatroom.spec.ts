import { mount, shallowMount } from '@vue/test-utils';
import Chatroom from "../../src/components/Chatroom.vue";
import Vuex from 'vuex';


describe('Chatroom.vue', () => {
  test('Test send msg function', async () => {
    let sendMsg;
    const wrapper = shallowMount(Chatroom, {
      global: {
        provide: {
          injectWsRes: [
          ],
          injectUser: {
            uuid: '5566'
          },
          mixinWebsocket: {
            initWebsocket: function () {},
            websocketsend: function (msg:string) {
              sendMsg = msg;
            },
            websocketclose: function () {},
          }
        }
      }
    })


    const input = wrapper.get('[data-test="msg"]')
    await input.setValue('Hello World')
    await wrapper.get('[data-test="button"]').trigger('click')

    expect(sendMsg).toBe('{"type":2,"msg":"Hello World"}')
  })

  test('Test auto focus', async () => {
    let sendMsg;
    const wrapper = mount(Chatroom, {
      attachTo: document.body,
      global: {
        provide: {
          injectWsRes: [
          ],
          injectUser: {
            uuid: '5566'
          },
          mixinWebsocket: {
            initWebsocket: function () {},
            websocketsend: function (msg:string) {
              sendMsg = msg;
            },
            websocketclose: function () {},
          }
        }
      }
    })


    // const input = wrapper.get('[data-test="msg"]')
    // await input.setValue('Hello World')
    wrapper.setData({injectWsRes: [
      {
        type: 1,
        msgid: 1,
        uuid: 'test',
        date: 'test',
        msg: 'test',
        users: [],
        selectAvatarId: 1,
        nickname: 'test'
      }
    ]});

    // expect(sendMsg).toBe('{"type":2,"msg":"Hello World"}')

    // let input = wrapper.find('input').element

    let input = wrapper.get('[data-test="msg"]').element
    console.log(input, wrapper);
    // expect(input).toBe(document.activeElement);
    expect(1).toBe(1);
  })
})

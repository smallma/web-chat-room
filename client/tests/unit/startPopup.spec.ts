import { mount, shallowMount } from '@vue/test-utils';
import StartPopup from "../../src/components/StartPopup.vue";
import Vuex from 'vuex';


describe('StartPopup.vue', () => {
  test('Test click avatar to select', async () => {
    let sendMsg;
    const wrapper = shallowMount(StartPopup, {
      props: {
        websocketsend: (msg:string) => {
          sendMsg = msg;
        }
      },
      global: {
        provide: {
          injectWsRes: [
          ],
          injectUser: {
            uuid: '5566'
          }
        }
      }
    })

    await wrapper.get('[data-id="10"]').trigger('click')
    expect(wrapper.vm.selectAvatarId).toBe(10)
  })

  test('Test input nickname and click button join', async () => {
    let sendMsg;
    const wrapper = shallowMount(StartPopup, {
      props: {
        websocketsend: (msg:string) => {
          sendMsg = msg;
        }
      },
      global: {
        provide: {
          injectWsRes: [
          ],
          injectUser: {
            uuid: '5566'
          }
        }
      }
    })

    const input = wrapper.get('[data-test="msg"]')
    await input.setValue('User 1')
    await wrapper.get('[data-test="button"]').trigger('click')

    expect(wrapper.vm.selectAvatarId).toBe(1)
    expect(wrapper.vm.nickname).toBe('User 1')
  })
})

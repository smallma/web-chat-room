import { mount } from '@vue/test-utils';
import Chat from "../../src/components/Chat.vue";


describe('Chat.vue', () => {
    it('is my join record', () => {
        const wrapper = mount(Chat, {
            props: {
                chat: {
                    type: 1,
                    uuid: '1',
                    msgid: 123,
                    selectAvatarId: 1,
                    msg: 'test',
                    date: '00:00'
                },
                user: {
                    nickname: 'aa',
                    uuid: '1', 
                    selectAvatarId: 1
                }
            },
        })

        expect(wrapper.classes()).toContain('is-join');
        expect(wrapper.classes()).toContain('mine');
        expect(wrapper.find('.content-msg').text()).toBe('test');
        expect(wrapper.find('.content-date').text()).toBe('00:00');
    })

    it('is others join record', () => {
        const wrapper = mount(Chat, {
            props: {
                chat: {
                    type: 1,
                    uuid: '2',
                    msgid: 123,
                    selectAvatarId: 1,
                    msg: 'test2',
                    date: '00:01'
                },
                user: {
                    nickname: 'aa',
                    uuid: '1', 
                    selectAvatarId: 1
                }
            },
        })
    
        expect(wrapper.classes()).toContain('is-join');
        expect(wrapper.classes()).not.toContain('mine');
        expect(wrapper.find('.content-msg').text()).toBe('test2');
        expect(wrapper.find('.content-date').text()).toBe('00:01');
    })

    it('is my chat record', () => {
        const wrapper = mount(Chat, {
            props: {
                chat: {
                    type: 2,
                    uuid: '1',
                    msgid: 123,
                    selectAvatarId: 1,
                    msg: 'test',
                    date: '00:00'
                },
                user: {
                    nickname: 'aa',
                    uuid: '1', 
                    selectAvatarId: 1
                }
            },
        })
    
        expect(wrapper.classes()).not.toContain('is-join');
        expect(wrapper.classes()).toContain('mine');
    })

    it('is others chat record', () => {
        const wrapper = mount(Chat, {
            props: {
                chat: {
                    type: 2,
                    uuid: '2',
                    msgid: 123,
                    selectAvatarId: 1,
                    msg: 'test2',
                    date: '00:01'
                },
                user: {
                    nickname: 'aa',
                    uuid: '1', 
                    selectAvatarId: 1
                }
            },
        })

        expect(wrapper.classes()).not.toContain('is-join');
        expect(wrapper.classes()).not.toContain('mine');
    })
})
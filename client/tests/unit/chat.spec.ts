import { mount } from '@vue/test-utils';
import Chat from "../../src/components/Chat.vue";
import Vuex from 'vuex';


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

// // import { shallowMount, createLocalVue } from '@vue/test-utils'
// // import Vuex from 'vuex'
// // import Chat from "../../src/components/Chat.vue";
// // // // import user from '../../src/store/user'

// // const localVue = createLocalVue()

// // localVue.use(Vuex)

// // // describe('Chat.vue', () => {
// // // //     let actions
// // // //     let state
// // // //     let store

// // // //     const fadeData = {
// // // //         nickname: "Nickname",
// // // //         selectAvatarId: 18,
// // // //         uuid: "1639276109817-66525"
// // // //     };

// // // //     beforeEach(() => {
// // // //         state = {
// // // //             clicks: 2
// // // //         }

// // // //         actions = {
// // // //             moduleActionClick: jest.fn()
// // // //         }

// // // //         store = new Vuex.Store({
// // // //             modules: {
// // // //                 user: {
// // // //                     state: {
// // // //                         nickname: fadeData.nickname,
// // // //                         selectAvatarId: fadeData.selectAvatarId,
// // // //                         uuid: fadeData.uuid
// // // //                     },
// // // //                     actions,
// // // //                     getters: user.getters
// // // //                 }
// // // //             }
// // // //         })
// // // //     })

// // // // //   it('calls store action "moduleActionClick" when button is clicked', () => {
// // // // //     const wrapper = shallowMount(Chat, { store, localVue })
// // // // //     const button = wrapper.find('button')
// // // // //     button.trigger('click')
// // // // //     expect(actions.moduleActionClick).toHaveBeenCalled()
// // // // //   })

// // // // //   it('renders "state.clicks" in first p tag', () => {
// // // // //     const wrapper = shallowMount(Chat, { store, localVue })
// // // // //     const p = wrapper.find('p')
// // // // //     expect(p.text()).toBe(state.clicks.toString())
// // // // //   })

// // //     it('for test', () => {
// // //         expect(1).toBe(1)
// // //     })
// // // })


// // import { shallowMount, createLocalVue } from '@vue/test-utils'
// // // import Vuex from 'vuex'
// // // import Chat from "../components/Chat.vue";
// // // import user from '../../src/store/user'

// // // const localVue = createLocalVue()

// // // localVue.use(Vuex)

// // describe('Chat.vue', () => {
// //     let actions
// //     let state
// //     let store

// //     const fadeData = {
// //         nickname: "Nickname",
// //         selectAvatarId: 18,
// //         uuid: "1639276109817-66525"
// //     };

// //     beforeEach(() => {
// //         state = {
// //             clicks: 2
// //         }

// //         actions = {
// //         }

// //         store = new Vuex.Store({
// //             modules: {
// //                 user: {
// //                     state: {
// //                         nickname: fadeData.nickname,
// //                         selectAvatarId: fadeData.selectAvatarId,
// //                         uuid: fadeData.uuid
// //                     },
// //                     actions,
// //                     getters: user.getters
// //                 }
// //             }
// //         })
// //     })

// //     it('for test', () => {
// //         // expect(1).toBe(1)
// //         const wrapper = shallowMount(Chat, { store, localVue })
// //     })
// // })


// import { mount } from '@vue/test-utils'
// import Chat from "../../src/components/Chat.vue"

// import Vuex from 'vuex'


// // import ST from "../../src/store/index";

// // const store = new Vuex.Store({
// //     state: {
// //         count: 333
// //     }
// // })

// // describe('Actions.vue', () => {
// //     let actions:any;
// //     let store:any;
  
// //     beforeEach(() => {
// //       actions = {
// //         actionClick: jest.fn(),
// //         actionInput: jest.fn()
// //       }
// //       store = new Vuex.Store({
// //         state: {},
// //         actions
// //       })
// //     })

// //     it('manipulates state', async () => {
// //         // const wrapper = mount(Chat)
    
// //         // await wrapper.setProps({ chat: {
// //             // msgid: 123,
// //             // selectAvatarId: 1,
// //             // msg: 'test',
// //             // date: '00:00'
// //         // }})
    
// //         // const store = new Vuex.Store({
// //         //     modules: {
// //         //         store: {
// //         //             namespaced: true,
// //         //             state: {
// //         //                 uuid: 123
// //         //             }
// //         //         }
// //         //     }
// //         // });
        
// //         const wrapper = shallowMount(Chat, { store })


// //         // const wrapper = shallowMount(Chat, {
// //         //     props: {
// //         //         chat: {
// //         //             msgid: 123,
// //         //             selectAvatarId: 1,
// //         //             msg: 'test',
// //         //             date: '00:00'
// //         //         }
// //         //     },
// //         //     plugins: [store]
// //         // });
    
// //         // const vm = wrapper.vm
// //         console.log(wrapper)
// //     })
// // });



// import { createStore } from 'vuex'
// import { user from "../../src/store/index";

// // const user = createStore({
// //   state() {
// //     return {
// //       uuid: 0
// //     }
// //   }
// // })

// // const user = createStore({
// //     state: {
//         // nickname: 'aa',
//         // uuid: 1, 
//         // selectAvatarId: 1
// //     },
// //     mutations: {
// //     //   increment(state, value = 1) {
// //     //     state.count += value
// //     //   }
// //     }
// // });

// // const store = new Vuex.Store({
// //     modules: {
// //         user: {
// //             namespaced: true,
// //             ST.state,
// //             getters: ST.getters
// //         }
// //     }
// // });

// // const key = Symbol()

// // const store = createStore({
// //     modules: {
// //         user: ST
// //     }
// //   })

// test('vuex', async () => {
//     // let actions: any;
//     // let state: any;
  
//     // state = {
//         // nickname: 'aa',
//         // uuid: 1, 
//         // selectAvatarId: 1
//     // }
    
//     // actions = {
//     // }


//     const state = {
//         nickname: 'aa',
//         uuid: '1', 
//         selectAvatarId: 1
//     }

//     const actions = {
//     }

//     // const store = new Vuex.Store({
//     //     modules: {
//     //         user: {
//     //         state,
//     //         actions,
//     //         getters: ST.getters,
//     //         namespaced: true
//     //         }
//     //     }
//     // })

//     const localStore = new Vuex.Store({
//         ...user,
//         state: state,
//     });

//     const wrapper = mount(Chat, {
        
//         props: {
//             chat: {
//                 msgid: 123,
//                 selectAvatarId: 1,
//                 msg: 'test',
//                 date: '00:00'
//             }
//         },
//         store: localStore,

//         // global: { 
//         //     plugins: [localStore]
            
//         // }
        
//     })
    
//     console.log(wrapper);
//     expect(1).toBe(1);   

    
// //   await wrapper.find('button').trigger('click')

// //   expect(wrapper.html()).toContain('Count: 1')
// })
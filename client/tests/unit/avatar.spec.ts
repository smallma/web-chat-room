import { mount } from '@vue/test-utils';
import Avatar from "../../src/components/Avatar.vue";
import Vuex from 'vuex';


describe('Avartar.vue', () => {
  it('test selectIndex is the same with avatar index', () => {
    const wrapper = mount(Avatar, {
      props: {
        index: 1,
        currentSelectIndex: 1
      },
    })

    // expect(wrapper.html()).toContain('<div class="avatar avatar-1 active">');
    expect(wrapper.classes()).toContain('active');
    expect(wrapper.classes()).toContain('avatar-1');
  })

  it('test selectIndex is not the same with avatar index', () => {
    const wrapper = mount(Avatar, {
      props: {
        index: 2,
        currentSelectIndex: 0
      },
    })

    expect(wrapper.classes()).not.toContain('active');
    expect(wrapper.classes()).toContain('avatar-2')
  })
})
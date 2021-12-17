import { mount } from '@vue/test-utils';
import Avatar from "../../src/components/Avatar.vue";


describe('Avartar.vue', () => {
  it('test selectIndex is the same with avatar index', () => {
    const wrapper = mount(Avatar, {
      props: {
        index: 1,
        currentSelectIndex: 1
      },
    })

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
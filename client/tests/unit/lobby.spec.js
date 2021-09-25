import { shallowMount, mount } from '@vue/test-utils'
import Lobby from '@/components/Lobby.vue'


describe('Lobby.vue', () => {
    it('renders', () => {
      const wrapper = mount(Lobby, {
        props: {
            msg: ["socket"]
          }
      })
      expect(wrapper.exists()).toBe(true);
    })
  })
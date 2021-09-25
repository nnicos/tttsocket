import { shallowMount, mount } from '@vue/test-utils'
import App from '@/components/Lobby.vue'
//import io from 'socket.io-client';
//import MockedSocket from 'socket.io-mock';

//jest.mock('socket.io-client');



describe('App.vue render test', () => {
    /*let socket=io('test');
  
    beforeEach(() => {
      socket = new MockedSocket();
      io.mockReturnValue(socket);
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });*/
 

    it('renders', () => {
      const wrapper = shallowMount(App, {
      })
      expect(wrapper.exists()).toBe(true);
    })
  })
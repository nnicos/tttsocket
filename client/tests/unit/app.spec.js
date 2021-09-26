import { shallowMount, mount } from '@vue/test-utils'
import App from '@/components/Lobby.vue'
//import io from 'socket.io-client';
//import MockedSocket from 'socket.io-mock';

//jest.mock('socket.io-client');

const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");



describe("my awesome project", () => {
    let io, serverSocket, clientSocket;

    //setup
    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
    });
    afterAll(() => {
        io.close();
        clientSocket.close();
    });
    
    it('renders', () => {
      const wrapper = shallowMount(App, {
      })
      expect(wrapper.exists()).toBe(true);
    })


});



/* describe('App.vue render test', () => {
     it('renders', () => {
      const wrapper = shallowMount(App, {
      })
      expect(wrapper.exists()).toBe(true);
    })
  }) */
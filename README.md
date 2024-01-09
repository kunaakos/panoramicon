# panoramicon

It's a **Panorami**cal (the game) **con**troller. It creates a virtual MIDI device that Panoramical can use as a controller, and serves a web interface that any number of users can open and use simultaneously.

The design follows the style of the game UI overlay. The interface is **touch-only**, meaning that it won't react to mouse clicks - open it on your mobile device!

![panoramicon_(iPad Mini)](https://github.com/kunaakos/panoramicon/assets/3966787/d6918a66-4cdf-4eeb-a48c-c9843ff2e6bf)

## getting it running

There are two separate projects, the **client** and **server**, both written in TypeScript. The client is Create React App, and the server is a node + expresss app executed using `ts-node`. The code is something written in one afternoon and fixed up in another, so don't expect wonders, but it's a good basis for a generic MIDI controller with a web interface.

In a nutshell, the **server** creates a virtual MIDI device named `panoramicon`, and opens up the `/midi` HTTP SSE api endpoint that offers the latest midi key (on/off) and control (value) states. This is a one-way connection, updates are handled via simple HTTP POST requests to `/midi/cc` for control change events and `/midi/note` for note on and note off events. It's mostly standard midi values passed as JSON, but for control change events, instead of passing absolute values, we're posting how much a value has changed. This is needed so multiple users can twiddle the same controls at the same time without it feeling glitchy.

Node 20.10.0 (preferably installed with nvm) and npm should be enough to get this running.

1. `npm install` both client and server directories (this is not a monorepo)
2. `npm run start` both projects
3. visit `localhost:3001` or `$YOUR_DEVICE_IP:3001` to check if everything works
4. start Panoramical and configure MIDI controls (the little square-shaped axis lock buttons should prove helpful)

## known issues

### Windows
Panoramical works best on Windows, but in my experience Windows eventually puts the process to sleep (?) after the terminal window the server runs in loses focus. There are probably ways around this, haven't looked into it.

### Mac
Couldn't get Panoramical running on modern macOS. Everything else works fine!

### Linux
Panoramical does run when installed from Steam, if you can get it running smoothly on your machine (I get sound distorsion). The server and client work perfectly.

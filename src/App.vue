<template>
  <router-view/>
</template>

<script>
import socket from './socket'

export default {
  created () {
    // grab the session ID (it may not exist yet)
    const sessionID = sessionStorage.getItem("sessionID");

    // if there is a sessionID, connect to socket, pass auth sessionID
    if (sessionID) {
      socket.auth = { sessionID };
      // socket.connect();
    }

    // on 'session' socket event, set the sessionID in sessionStorage
    socket.on("session", ({ sessionID }) => {
      socket.auth = { sessionID };
      sessionStorage.setItem("sessionID", sessionID);
    });
  }
}
</script>


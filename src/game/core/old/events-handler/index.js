/* Event Handlers */
import addEventListener from "@/game/core/old/events-handler/listener/add.event.listener";
import moveEventListener from "@/game/core/old/events-handler/listener/move.event.listener";
import removeEventListener from "@/game/core/old/events-handler/listener/remove.event.listener";
import scoreUpdateEventListener from "@/game/core/old/events-handler/listener/scoreUpdate.event.listener";
import crushesEventListener from "@/game/core/old/events-handler/listener/crushes.event.listener";
import movementCountEventListener from "@/game/core/old/events-handler/listener/movementCount.event.listener";

export default {
    registerListeners () {
        this.detachListeners();
        document.addEventListener('add', addEventListener);
        document.addEventListener('move', moveEventListener);
        document.addEventListener('remove', removeEventListener);
        document.addEventListener('scoreUpdate', scoreUpdateEventListener);
        document.addEventListener('crushes', crushesEventListener);
        document.addEventListener('movement', movementCountEventListener);
    },

    detachListeners(){
        document.removeEventListener('add',addEventListener);
        document.removeEventListener('move', moveEventListener);
        document.removeEventListener('remove', removeEventListener);
        document.removeEventListener('scoreUpdate', scoreUpdateEventListener);
        document.removeEventListener('crushes', crushesEventListener);
        document.removeEventListener('movement', movementCountEventListener);
    }
}
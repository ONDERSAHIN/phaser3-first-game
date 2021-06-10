import EventBus from "@/bus/event.bus";

function movementCountEventListener(e){
    EventBus.$emit('movement',e.detail);
}

export default movementCountEventListener;
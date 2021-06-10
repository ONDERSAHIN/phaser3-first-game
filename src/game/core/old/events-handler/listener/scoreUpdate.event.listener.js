import EventBus from "@/bus/event.bus";

function scoreUpdateEventListener(e){
    EventBus.$emit('update-score',e.detail);
}

export default scoreUpdateEventListener;
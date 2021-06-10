import EventBus from "@/bus/event.bus";

function crushesEventListener(e){
    EventBus.$emit('crushes',e.detail);
}

export default crushesEventListener;
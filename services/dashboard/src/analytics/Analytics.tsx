
import { id as ID } from "../settings/Settings";

interface InteractionEvent
 {
    id: string,
    event: string, 
}

const recordInteraction = function(event:InteractionEvent) {
    fetch('http://localhost:3005/recordInteraction', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: event.id,
      event: event.event,
    })
  }).then(function(response) {
        return "ok";
  }).then(function(data) {
        return "ok";
    })
}  

export const sendEvent = function (event:string) {
    recordInteraction({
        id: ID,
        event: event,
    })
}

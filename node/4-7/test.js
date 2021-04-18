const EventHandler = require('events')
class EventCls extends EventHandler {

}
let eventCls = new EventCls()
eventCls.on('test',(e)=>{
    console.log(e)
})
eventCls.emit('test',new Error('opps'))
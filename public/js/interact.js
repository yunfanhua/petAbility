import { playAction } from "./animate.js"

$('#interact-container canvas').click(e=>{
    playAction('Jump');
    playAction('Idle');
})
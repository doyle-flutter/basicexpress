let id = sessionStorage.getItem('id');
let userId = document.getElementById('userId');
const io = io('ws://192.168.0.2:3000');

if(id == null){
    userId.innerText = "로그인이 필요합니다";

}
else{
    userId.innerText = id;
}
let chatBtn = document.getElementById('chatForm');
chatBtn.onsubmit = () => {
    console.log("asd")
    console.log(id);
    if(id == null) return false;
    
    io.on('connection',(socket) => {
        socket.emit('open', "opeopopeop") 
    });
    return false;
}
console.log("Asd");
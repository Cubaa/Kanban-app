import io from 'socket.io-client'

export class KanbanChat{
    protected kanban_chat: HTMLElement;
    protected chat_on_button: HTMLElement;
    private socket: any;
    public chat_input: HTMLInputElement;
    protected chatMessageWindow: HTMLElement;
    constructor(){
        this.kanban_chat = document.querySelector('div.live_chat')!
        this.chat_on_button = document.querySelector('div.chat_on')!
        this.chatMessageWindow = document.querySelector('div.chat_message_window')!
        this.chat_input = document.querySelector('div.chat_input_button_wrapper input')!
        document.querySelector('div.chat_window i')?.addEventListener("click", ()=>this.hiddenChatHandle())
        document.querySelector('div.chat_on')?.addEventListener("click", ()=>this.showChatHandle())
        document.querySelector('div.chat_input_button_wrapper button')?.addEventListener("click", (e)=>this.addNewMessage(e))
        this.socket = io('http://localhost:5500/');
        this.socket.on('message', message=>{
            console.log(message)
        })
        this.socket.on('chatmessage', data=>{
            this.addMessageFromOtherClient(data)
        })
    }
public showChatHandle(){
console.log("klik")
this.kanban_chat.classList.add('show')
this.chat_on_button.classList.add('hidden')

}
public hiddenChatHandle(){
    this.kanban_chat.classList.remove('show')
    this.chat_on_button.classList.remove('hidden')
}
public addNewMessage(e:any){
    e.preventDefault();
    let inputValue = this.chat_input.value
    this.socket.emit('chatmessage', inputValue )
console.log("klik")
const chatMessage = document.createElement('div')
chatMessage.classList.add('chat_message')
const contentChatMessage = document.createElement('p')
contentChatMessage.textContent = inputValue
chatMessage.appendChild(contentChatMessage)
this.chatMessageWindow.appendChild(chatMessage)
}
public addMessageFromOtherClient(data){
 

    const chatMessage = document.createElement('div')
    chatMessage.style.backgroundColor="lightpink"
    chatMessage.classList.add('chat_message')
    const contentChatMessage = document.createElement('p')
    contentChatMessage.textContent = data
    chatMessage.appendChild(contentChatMessage)
    this.chatMessageWindow.appendChild(chatMessage)
}
  

}
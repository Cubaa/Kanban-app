import { CreateKanbanColumn } from './modules/CreateKanbanColumn';
import { StorageColumns } from './modules/StorageColumns';
import {CreateKanbanNote} from './modules/CreateKanbanNote'
import io from 'socket.io-client'
import {removeColumn} from './modules/decorators'
import dragula from 'dragula'
// import { CreateKanbanNote } from './modules/CreateKanbanNote';

import './styles/styles.scss';
import { KanbanChat } from './modules/kanbanChat';

class KanbanApp{
    protected kanbanBoard: HTMLElement;
    public drake: any;
    constructor(){
        this.kanbanBoard = document.querySelector('section.kanban_board')!;
        const columns = StorageColumns.getColumnsFromStorage()
        console.log(columns)
       
        const createKanbanColumn = new CreateKanbanColumn(columns)
        const storageColumns = new StorageColumns()
        const createKanbanNote = new CreateKanbanNote(columns)
    
        const kanabnChat = new KanbanChat()
        this.drake = dragula({
            removeOnSpill: true
          });
        this.renderColumnsFromStorage(columns, createKanbanColumn)
    }
    
    public renderColumnsFromStorage(columns:any, createKanbanColumn:any){
      
        if(columns!==null){
            let notesDiv = []
        const allColumns = columns.map((note: any, index: number)=>{
            console.log(note.notes)
           notesDiv =  note.notes.map(el => {
            return(`<div class="kanban_note">
                     <span>${el.content}</span>
                     </div>`)
            });
            console.log(notesDiv)
            // const wrapperNotes = document.createElement<any>('div')!
            // wrapperNotes.className="kanban_note"
            // wrapperNotes.innerHTML =
            // ${note.notes.length!==0 ? 
            //     note.notes.forEach((el:any, index:number) => {
            //         console.log(el.content)
            //         return`<div class="kanban_note">
            //             <span>${el.content}</span>
            //          </div>`
            //     }) : null
            // }
            
            const wrapperDiv = document.createElement<any>('div')!
            wrapperDiv.className = "kanban_column"
            wrapperDiv.setAttribute("data-columnId", `${index+1}`)
            wrapperDiv.style.backgroundColor= `${note.color}`
            wrapperDiv.innerHTML = 
            `
            <div class="icon_remove_wrapper">
                    <i class="fas fa-times"></i>
                </div>
            <div class="column_info">
                <span class="column_info_title">${note.title}</span>
            </div>
            ${notesDiv}
            <div class="icon_add_note">
                <i class="fas fa-plus"></i>
            </div>
            `
            this.drake.containers.push(wrapperDiv);
            return wrapperDiv
        })
       
       document.querySelectorAll('.kanban_column').forEach((item)=>{
            item.remove()
        })
        allColumns.forEach((item:any, index: number)=>{
            if(index===0){
                console.log("PIERWSZY")
            this.kanbanBoard.insertBefore(item, this.kanbanBoard.firstChild)}
            else  {
                console.log("KOLEJNY")
            console.log(this.kanbanBoard.children[index-1])
                this.kanbanBoard.children[index-1].after(item)
            }
          
        })
    }
    
    const allColumns = document.querySelectorAll<HTMLElement>('div.kanban_column')
        const a = document.querySelectorAll<HTMLElement>('div.kanban_column i.fa-times')
        
         if(allColumns.length!==0){
           
           
            console.log(a)
             console.log("chujek")
             a.forEach((item: HTMLElement)=>{
                 console.log(item)
                 
                 item.onclick = (e)=>createKanbanColumn.removeColumn(e)
             })
         }
}
}




const kanban = new KanbanApp()
// const createKanbanNote = new CreateKanbanNote()
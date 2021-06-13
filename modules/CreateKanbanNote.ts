import { CreateKanbanColumn } from "./CreateKanbanColumn";
import { StorageColumns } from "./StorageColumns";
import {IColumnType} from '../Types/columnTypes'

export class CreateKanbanNote{

    public allDataColumns: any;
    public allColumnsDiv: any
    public popupNoteData: any;
    public columnID: any;
    public noteDataInput: HTMLInputElement;
    protected columnData: IColumnType;
    constructor(columns){
        this.columnData={
            id: 0,
            title: "",
            color: "",
            notes: []
        }
        this.allDataColumns = columns
        
        console.log("CHUJ")
        // console.log(this.allDataColumns.length)
              console.log( document.querySelector('div.create_column i'))
              this.popupNoteData = document.querySelector('div.popup_data_note')!
              this.noteDataInput = document.querySelector('div.popup_data_note input')!

              document.querySelector('div.popup_data_note i')!.addEventListener("click", ()=>this.closePopupDataNote())
              document.querySelector<HTMLButtonElement>('div.popup_data_note button')?.addEventListener("click", (e)=>this.createKanbanNote(e))
      setTimeout(()=>{
        this.allColumnsDiv = document.querySelectorAll('div.kanban_column')
        console.log(this.allColumnsDiv)
        
        document.querySelectorAll('div.kanban_column div.icon_add_note i').forEach((item:any)=>{
            item.onclick = (e)=>this.openPopupDataNote(e)
        })
      }, 4000)
        
    
     
    }
    public closePopupDataNote(){
        this.popupNoteData.style.display="none"
        document.querySelector<HTMLElement>('div.blur_layout')!.style.display="none"
    }
    public openPopupDataNote(e){
        this.columnID = e.target.parentElement.parentElement.dataset.columnid
        console.log(this.columnID)
        this.popupNoteData.style.display="block"
        document.querySelector<HTMLElement>('div.blur_layout')!.style.display="block"
    }
    public createKanbanNote(e) {
        if(this.noteDataInput.value==="")
        return
        console.log("KLIK ADD")
        let searchColumn
        console.log(this.allDataColumns)
        console.log(CreateKanbanColumn.arrayOfDatacolumns)
         
        




        searchColumn = CreateKanbanColumn.arrayOfDatacolumns.filter(el => {
            console.log(el)
            if(el.id===this.columnID*1){
                console.log(":WCHODZE")
                console.log(el)
                return el
            }
        });
        
        console.log("SEARCH KOLUMN")
        console.log(searchColumn)
       
        searchColumn[0]?.notes.push({
            content: this.noteDataInput.value
        })
        console.log(searchColumn[0])
        
       
        const noteDiv = document.createElement('div')
        noteDiv.className='kanban_note'
        const spanNote = document.createElement('span')
        spanNote.textContent = this.noteDataInput.value
        noteDiv.appendChild(spanNote)
        console.log(e.target.parentElement.parentElement)
        const note = document.querySelector(`[data-columnid="${this.columnID}"]`)
        //note?.appendChild(noteDiv)
       const addNoteIcon = e.target;
       console.log(addNoteIcon)
       console.log("HCUCHCHCHCHCHCHCHCHCHCHCCCCCCCCC")
        console.log(searchColumn)
   
      
        
            console.log(note?.firstChild)
        // note?.appendChild(noteDiv)
        console.log(searchColumn[0]?.length)
        note?.insertBefore(noteDiv, note.lastElementChild)


        // return(`<div class="kanban_note">
        //              <span>${el.content}</span>
        //              </div>`)
        //     });
        this.popupNoteData.style.display="none"
        document.querySelector<HTMLElement>('div.blur_layout')!.style.display="none"
        StorageColumns.updateColumnFromStorage(CreateKanbanColumn.arrayOfDatacolumns)
    }
    

}
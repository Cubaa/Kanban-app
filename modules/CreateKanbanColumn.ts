import {IColumnType} from '../Types/columnTypes'
import { StorageColumns } from './StorageColumns';
import io from 'socket.io-client'
import { CreateKanbanNote } from './CreateKanbanNote';
import dragula from 'dragula'

export class CreateKanbanColumn extends CreateKanbanNote {
    protected kanbanBoard: HTMLElement;
    protected createColumnPanel: HTMLElement;
    protected blurLayout: HTMLElement;
    protected popupDataColumn: HTMLElement;
    protected columnData: IColumnType;
    protected inputTitle: HTMLInputElement;
    protected inputColor: HTMLInputElement;
    public static arrayOfDatacolumns: any[];
    public drake:any;
    //protected allColumns: any;
    constructor(public columns: any){
      super(columns)

        this.columnData={
            id: 0,
            title: "",
            color: "",
            notes: []
        }
        // this.allColumns = document.querySelectorAll<HTMLElement>('.kanban_column')!
        CreateKanbanColumn.arrayOfDatacolumns=this.columns===null ? [] : this.columns
        this.kanbanBoard = document.querySelector('section.kanban_board')!;
        this.createColumnPanel = document.querySelector('div.create_column')!;
        this.blurLayout = document.querySelector('div.blur_layout')!
        this.popupDataColumn = document.querySelector('div.popup_data_column')!
        this.inputColor = document.querySelector('div.popup_data_column input.column_color')!
        this.inputTitle = document.querySelector('div.popup_data_column input.column_title')!

        document.querySelector('div.create_column i')!.addEventListener("click", ()=>this.openPopupDataColumn())
        document.querySelector('div.popup_data_column i')!.addEventListener("click", ()=>this.closePopupDataColumn())
        document.querySelector('div.popup_data_column button')!.addEventListener("click", ()=>this.setColumnData())
        console.log(document.querySelectorAll('div.kanban_column'))
        
     
        this.drake = dragula({
            removeOnSpill: true
          });

        

        
    }
   
    public openPopupDataColumn(){
        console.log("klik")
        console.log("POPOUP OPEN")
        this.blurLayout.classList.add('active')
        this.popupDataColumn.classList.add('active')
        console.log(this.columnData)
        console.log(this.columns)
        
    }
    public closePopupDataColumn(){
        this.blurLayout.classList.remove('active')
        this.popupDataColumn.classList.remove('active')
    }
    public setColumnData(){
        console.log("ID " + CreateKanbanColumn.arrayOfDatacolumns.length)
        if(this.inputTitle?.value==="")
        return
        this.columnData={
            id: CreateKanbanColumn.arrayOfDatacolumns.length + 1,
            title: this.inputTitle?.value,
            color: this.inputColor?.value,
            notes: []
        }
        console.log(this.columnData)
        CreateKanbanColumn.arrayOfDatacolumns?.push(this.columnData)
        this.addColumn()
        this.inputTitle.value=""
        this.inputColor.value=""
        console.log("IHUSGHDUHWUDHUWDHUWDHUWDHWD")
        console.log(CreateKanbanColumn.arrayOfDatacolumns)
        
    }
    public addColumn(){
        console.log("DODANA KOLUMNA")
        console.log(this.columnData)
        
    
        this.createColumn()
      

        this.blurLayout.classList.remove('active')
        this.popupDataColumn.classList.remove('active')
        console.log(CreateKanbanColumn.arrayOfDatacolumns)
        document.querySelectorAll('div.kanban_column div.icon_add_note i').forEach((item:any)=>{
            item.onclick = (e)=>this.openPopupDataNote(e)
        })
      
        StorageColumns.addColumnsToStorage(CreateKanbanColumn.arrayOfDatacolumns)
    }

    
    public createColumn(){
        const wrapperDiv = document.createElement<any>('div')!
        wrapperDiv.className = "kanban_column"
        wrapperDiv.setAttribute("data-columnId", `${CreateKanbanColumn.arrayOfDatacolumns.length}`)
        wrapperDiv.style.backgroundColor= `${this.columnData.color}`
        wrapperDiv.innerHTML = 
        `
        <div class="icon_remove_wrapper">
                    <i class="fas fa-times"></i>
                </div>
        <div class="column_info">
            <span class="column_info_title">${this.columnData.title}</span>
        </div>
        <div class="icon_add_note">
            <i class="fas fa-plus"></i>
        </div>
        `
        
        if(CreateKanbanColumn.arrayOfDatacolumns.length===1){
            console.log("PIERWSZY")
        this.kanbanBoard.insertBefore(wrapperDiv, this.kanbanBoard.firstChild)}
        else  {
            console.log("KOLEJNY")
        console.log(this.kanbanBoard.children[CreateKanbanColumn.arrayOfDatacolumns.length-2])
            this.kanbanBoard.children[CreateKanbanColumn.arrayOfDatacolumns.length-2].after(wrapperDiv)
        }
        
        this.drake.containers.push(wrapperDiv);
    console.log(this.drake)
        const allColumns = document.querySelectorAll<HTMLElement>('div.kanban_column')
        const a = document.querySelectorAll<HTMLElement>('div.kanban_column i.fa-times')
        
         if(allColumns.length!==0){
           
           
            console.log(a)
             console.log("chujek")
             a.forEach((item: HTMLElement)=>{
                 console.log(item)
                 item.onclick = (e)=>this.removeColumn(e)
             })
         }
      // this.setClickRemoveEvent()
     
    }
   
    public removeColumn(e: any){
       
        console.log(e.target.parentElement.parentElement.dataset)
        const columnID = e.target.parentElement.parentElement.dataset.columnid
        console.log(columnID)
        console.log("klik remove")
        CreateKanbanColumn.arrayOfDatacolumns.splice(columnID-1, 1)
        CreateKanbanColumn.arrayOfDatacolumns.forEach((column, index:number)=>{
            column.id=++index
        })
        console.log(CreateKanbanColumn.arrayOfDatacolumns)
        e.target.parentElement.parentElement.remove()
        const allColumns = document.querySelectorAll<HTMLElement>('div.kanban_column')
        allColumns.forEach((item: any, index: number)=>{
            item.dataset.columnid = ++index
        })
        StorageColumns.updateColumnFromStorage(CreateKanbanColumn.arrayOfDatacolumns)
    
    }
}










//   if(this.columns!==null){
    //    console.log("WCXHODZEW")
    //     const a = this.arrayOfnotes.map((note)=>{
    //        this.createColumn()
    //     })
  
    //     document.querySelectorAll<HTMLElement>('.kanban_column')!.forEach((item:any)=>{
    //         item.remove()
    //     })
  
        // a.forEach((item)=>{
        //     this.kanbanBoard.insertBefore(item, this.kanbanBoard.firstChild)
        // })
    
        // this.blurLayout.classList.remove('active')
        // this.popupDataColumn.classList.remove('active')
        // StorageColumns.addColumnsToStorage(this.arrayOfnotes)
    // }else{   // }
const addButton = document.querySelector('#add');

const updateLSData=()=>{
    const textAreaData=document.querySelectorAll('textarea');
    const notes=[];

    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    })
    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote = (text = ' ') =>{
    const note = document.createElement('div');   // createElement is used for creating a div in javaScript
    note.classList.add('note');   //  classList is the property that have some property and one of the property is add from which we can add class dynamically in JS.

    const htmlData= `  
    <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

     <div class="main ${text ? " " : "hidden"}"> </div>
    <textarea class="${text ? "hidden" : ""}"></textarea>   `;   
     // here we use Templete Literal

    note.insertAdjacentHTML('afterbegin',htmlData);  
    // console.log(note);
    // insert data in note trough insertAdjacentHTML which takes two parameters 1st is where we have to insert and second is which data.

    // getting the reference
    const editButton=note.querySelector('.edit');
    const delButton=note.querySelector('.delete');
    const mainDiv=note.querySelector('.main');
    const textArea=note.querySelector('textarea');

    // deleting the note
    delButton.addEventListener('click',()=>{
        note.remove();
        updateLSData();
    })


    // toggle using edit button
    textArea.value=text;
    mainDiv.innerHTML=text;

    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    // here we use onchange event which will display the value when we change something and click out the div
    //  we can use the input also instead of cange but the problem is that it shows on the console every single string when we press any key it shows all the string one by one
    textArea.addEventListener('change',(event)=>{
        const value=event.target.value;
        mainDiv.innerHTML=value;

        updateLSData();
    })




    document.body.appendChild(note);
    // it append a node as the last child of the node
    
}

const notes= JSON.parse(localStorage.getItem('notes'));
if(notes){notes.forEach((note)=>addNewNote(note))}


addButton.addEventListener('click',()=>{
    addNewNote()});
//  (or we can write this) addButton.addEventListener('click',() => addNewNote() );

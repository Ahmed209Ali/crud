let title= document.querySelector('#title');
let allcost=document.querySelectorAll('#allcost input');
let count=document.querySelector('#count')
let Dpartment=document.querySelector('#Dpartment')
let btn=document.querySelector('#btn1')
let tbody=document.querySelector('#tbody')
let clear=document.querySelector('#clear')
let span1=document.querySelector('#span-1')
let invalid_span=document.querySelector('.invalid_span')
let allinput=document.querySelectorAll('input');
let span=document.querySelectorAll(".invalid_span")
let inputtask=document.querySelectorAll('.inputtask');
let invalid_number=document.querySelectorAll('.invalid_number')











let validationerorr=false;





for(let i=0;i<allinput.length;i++){

    if(allinput[i].value==""){
        validationerorr=false;
    }

    else{
        validationerorr=true;
    }
    allinput[i].addEventListener('keyup',function(){

        if(allinput[i].value==""){
            allinput[i].classList.add("invalid")
            span[i].classList.remove("invalid_span")
            validationerorr=false;
        }
        else{
            validationerorr=true;
            allinput[i].classList.remove("invalid")
            span[i].classList.add("invalid_span")
        }
    });
}




for(let i=0;i<inputtask.length;i++){

    if(inputtask[i].value<=0){
        validationerorr=false;
    }

    else{
        validationerorr=true;
    }
    inputtask[i].addEventListener('keyup',function(){

        if(inputtask[i].value<=0){
            inputtask[i].classList.add("invalid")
            invalid_number[i].classList.remove("invalid_number")
            validationerorr=false;
        }
        else{
            validationerorr=true;
            inputtask[i].classList.remove("invalid")
            invalid_number[i].classList.add("invalid_number")
        }
    });
}

















let mode='create'
let glopal;
 let Arry;
if(localStorage.Arry!=null){
Arry=JSON.parse(localStorage.Arry);}
else{
    Arry=[];
}

let gettotal=()=>{
    price=allcost[0].value;
    tax=allcost[1].value;
    discount=allcost[2].value;
    let taxcost=+price * (+tax/100)
   
    total=(+taxcost+ +price)-discount; 
    allcost[3].value=Math.ceil(total)
}
for(let i=0;i<allcost.length;i++){
allcost[i].addEventListener('keyup',gettotal)
}
let del=()=>{
    title.value=""
    allcost[0].value=""
    allcost[1].value=""
    allcost[2].value=""
    allcost[3].value=""
    count.value=""
    Dpartment.value=""
}

let creatobject=()=>{
let newproduct={
    title: title.value,
    price: allcost[0].value,
    tax: allcost[1].value,
    discount:  allcost[2].value,
    total: allcost[3].value,
    Count: count.value,
    Dpartment:Dpartment.value
}
if(validationerorr==true){
    if(mode=='create'){
        if(count.value>1){
            for(let i=0;i<count.value;i++){
                Arry.push(newproduct);
            }
     
        }
        else{
            Arry.push(newproduct);
        }
    }



else{
    Arry[glopal]=newproduct;
    mode='create'
    btn.innerHTML='Add product'
    btn.classList.replace('btn-card-update','btn-card')
count.style.display='block'
}



del()
renderdata()

localStorage.setItem("Arry",JSON.stringify(Arry));
validationerorr=false;
}

}







let renderdata=()=>{
   let table=''
   for(let i=0;i<Arry.length;i++){
    table+=`<tr>
    <td>  ${i+1}</td>
    <td>  ${Arry[i].title}</td>
    <td>  ${Arry[i].price}</td>
    <td>  ${Arry[i].tax}</td>
    <td>  ${Arry[i].discount}</td>
    <td>  ${Arry[i].total}</td>
    <td>  ${Arry[i].Count}</td>
    <td>  ${Arry[i].Dpartment}</td>
    <td>
    <i class="fa-solid fa-plus" onclick='edite(${i})'></i> 
    <i class="fa-solid fa-xmark" onclick='delereitems(${i})'></i>
    </td>
 
    
    </tr>`
   }
   tbody.innerHTML=table;
   if(Arry.length==0){
 clear.style.display='none';
}
else{
    clear.style.display='block';  
    span1.innerHTML=Arry.length
}

}


renderdata()
btn.addEventListener('click',creatobject)
let clearall=()=>{
    localStorage.clear();
    Arry.splice(0)
    renderdata()
}


clear.addEventListener('click',clearall)

let delereitems =(i)=>{
Arry.splice(i,1);
localStorage.setItem('Arry',JSON.stringify(Arry))
renderdata()
}

let edite=(i)=>{
    mode='update'
    glopal=i
    title.value=Arry[i].title
    allcost[0].value=Arry[i].price
    allcost[1].value=Arry[i].tax
    allcost[2].value=Arry[i].discount
    allcost[3].value=Arry[i].total
    Dpartment.value=Arry[i].Dpartment;
    count.style.display="none"
    btn.innerHTML=`Update Product : ${i+1}`;
    btn.classList.replace('btn-card','btn-card-update')


}
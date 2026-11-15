let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let catogray=document.getElementById('catogray')
let submet=document.getElementById('submet')
 
let mode="create"
let temp;
// get total
 
function getTotal(){
    if(price.value!="")
    {
        let resutl=(+price.value + +taxes.value+ +ads.value)- +discount.value
        total.innerHTML=resutl;
        total.style.background='green'

    }
    else{
        total.style.background='red'
        total.innerHTML=""
    }
}


// function create
let datapro

if(localStorage.product!=null)
{
    datapro=JSON.parse(localStorage.product)
}
else
{
    datapro=[]
}

submet.onclick=function()
{
    newpro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:catogray.value

    }
    if(title.value!=''&&price.value && catogray.value!=''&&newpro.count<100)
    {
        
    if (mode==="create")
    {
    if(newpro.count>1)
    {
        for(let i=0; i<newpro.count; i++)
        {
             datapro.push(newpro)
        }
        
    }
    else{
        
          datapro.push(newpro)

    }
}
else{
    datapro[temp]=newpro
    mode="create"
    count.style.display="block"
    submet.innerHTML="create"

}
   dataclear()

    }

    
  
    localStorage.setItem('product' , JSON.stringify(datapro))
  
     showData()

}

function dataclear()
{
    title.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discount.value=""
    total.innerHTML=""
    count.value=""
    catogray.value=""
    
}

// function read

function showData()
{
    getTotal();
    let table=""
    for(let i=1; i<datapro.length; i++)
    {
        table +=`
             <tr>
                        <td>${i}</td>
                        <td>${ datapro[i].title}</td>
                        <td>${ datapro[i].price}</td>
                        <td>${ datapro[i].taxes}</td>
                        <td>${ datapro[i].ads}</td>
                        <td>${ datapro[i].discount}</td>
                        <td>${ datapro[i].total}</td>

                        <td>${ datapro[i].category }</td>
                        <td><button onclick=" update(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
                    </tr>
        `

    }
        document.getElementById('tbody').innerHTML=table
        let btnDelete=document.getElementById('deleteAll')

        if(datapro.length>0)
        {
            btnDelete.innerHTML=`<button onclick="deleteAll()" >deleteAll ${datapro.length}</button>`


        }
        else
        {
             btnDelete.innerHTML=""

        }
     

}
showData();

// function deleteData()
function deleteData(i)
{
  datapro.splice(i,1)
  localStorage.product=JSON.stringify(datapro)
showData()

}

function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    showData();

}

function update(i)
{
    getTotal();
  
title.value=datapro[i].title.toLowerCase();
price.value=datapro[i].price
taxes.value=datapro[i].price;
ads.value=datapro[i].ads;
discount.value=datapro[i].discount;
 catogray.value=datapro[i].category.toLowerCase();
 count.style.display='none'
 submet.innerHTML="update"
 mode="udpate"
 temp=i;

scroll({top:0,
    behavior:"smooth",
})
   

}

// function search 

let searchmood="title"
function getsearchmood(id)
{
let search=document.getElementById("search")

 if(id==="searchtitle")
 {
    searchmood="title"
   
 }
 else
    {
        searchmood="catogery"
        search.placeholder='search by'+ searchmood

 }
 search.focus()
 search.value=""
 showData()

}

function SearchData(value)
{
    let table=""
 
    if(searchmood=="title")
    {
        for(let i=0; i<datapro.length; i++)
        {
         if(datapro[i].title.toLowerCase().includes(value.toLowerCase()))
         {
             table +=`
             <tr>
                        <td>${i}</td>
                        <td>${ datapro[i].title}</td>
                        <td>${ datapro[i].price}</td>
                        <td>${ datapro[i].taxes}</td>
                        <td>${ datapro[i].ads}</td>
                        <td>${ datapro[i].discount}</td>
                        <td>${ datapro[i].total}</td>

                        <td>${ datapro[i].category }</td>
                        <td><button onclick=" update(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
                    </tr>
        `
          }
        }

    }
    else
    {
          for(let i=0; i<datapro.length; i++)
        {
         if(datapro[i].category.toLowerCase().includes(value.toLowerCase()))
         {
             table +=`
             <tr>
                        <td>${i}</td>
                        <td>${ datapro[i].title}</td>
                        <td>${ datapro[i].price}</td>
                        <td>${ datapro[i].taxes}</td>
                        <td>${ datapro[i].ads}</td>
                        <td>${ datapro[i].discount}</td>
                        <td>${ datapro[i].total}</td>

                        <td>${ datapro[i].category }</td>
                        <td><button onclick=" update(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
                    </tr>
        `
          }
        }

    }
      document.getElementById('tbody').innerHTML=table
}    

  

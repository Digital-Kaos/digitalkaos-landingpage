const MEMBERS = ["MaurickThom","ErickHR",'edsonJordan','DavilaManuel','rattboy25']
const URL = "https://api.github.com/users/"
const carousel = document.getElementById('carousel')

const fila = document.querySelector('.carousel-container');
const flechaIzquierda = document.getElementById('button-prev');
const flechaDerecha = document.getElementById('button-next');



async function ajax({uri,method,body}){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await fetch(uri, {method,headers,body});
    const data = await response.json();
    return data;
}

async function getUsers(members){
    const users = []
    members.forEach(member => {
        users.push(ajax(
            {
                uri:`${URL}${member}/repos`,
                method:'GET',
            }
        ))
    });
    const responses = await Promise.all(users)
    
    const AllRepos = responses.reduce((acc,curr)=>{
        if( !curr.length ) return acc
        const newArr = curr.slice(0,5)
        return [,...newArr]
    },[])

    if(!AllRepos.length) return
    
    const template = AllRepos.reduce((acc,curr)=>{
        return `${acc}<article class="card"></article>`
    },'')

    carousel.innerHTML=``
    carousel.innerHTML=template
}

getUsers(MEMBERS)
flechaDerecha.addEventListener('click', () => {
    fila.scrollLeft += fila.offsetWidth;
});
flechaIzquierda.addEventListener('click', () => {
    fila.scrollLeft -= fila.offsetWidth;
});
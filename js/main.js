const MEMBERS = ["MaurickThom","ErickHR",'edsonJordan','DavilaManuel','rattboy25']
const URL = "https://api.github.com/users/"
const carousel_container = document.getElementById('carousel')

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
                method:'GET'
            }
        ))
    });
    const responses = await Promise.all(users)
    console.log(responses);
}

getUsers(MEMBERS)
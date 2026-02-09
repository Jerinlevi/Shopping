const url="https://shopping-hekq.onrender.com"

export async function apiFetch(path,options={}){
    const token=localStorage.getItem('token');

    const headers={
        "Content-Type":"application/json",
        ...(token && {Authorization:`Bearer ${token}`})
    }
    const res=await fetch(url+path,{
        ...options,
        headers
    }
    )
    if(!res.ok){
        throw new Error("Request failed");
       }
      
       return res.json();

}
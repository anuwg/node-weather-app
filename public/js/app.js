document.querySelector('form').addEventListener('click', (e)=>{
    e.preventDefault()
    const location = document.querySelector('input').value
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            if(data.error){
                document.querySelector('p').textContent='Cannot find weather data'
            } else{
                document.querySelector('p').textContent=data.weather
            }
        })
    })
})
const loadAiHub = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data =await res.json();
    displayAiHub(data.data.tools);
}

const displayAiHub = ai => {
    console.log(ai);
}

loadAiHub();
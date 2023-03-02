const loadAiHub = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayAiHub(data.data.tools);
}

const displayAiHub = aiHub => {
    const aiContainer = document.getElementById('ai-container')
    aiHub.forEach(ai => {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML = `
           <div class="card">
              <img src="${ai.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-feature">Features</h5>
                    
                    <p class="card-text">This is a longer card with supporting text below as a naturallead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
    `;
    aiContainer.appendChild(aiDiv);
    })
}

loadAiHub();
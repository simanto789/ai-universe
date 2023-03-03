const loadAiHub = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayAiHub(data.data.tools.slice(0, 6));
    const showAllButton = document.getElementById('btn-show-all');
    showAllButton.addEventListener('click', () => {
        displayAiHub(data.data.tools);
        showAllButton.style.display = 'none';
    });
}
const displayAiHub = aiHub => {
    const aiContainer = document.getElementById('ai-container');
    aiContainer.innerHTML = '';
    aiHub.forEach(ai => {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML = `
           <div class="card">
              <img src="${ai.image}" class="card-img-top img-fluid rounded" alt="...">
                <div class="card-body">
                    <h5 class="card-feature">Features</h5>
                     <ol mb-2> 
                       ${ai.features.map(feature => `<li>${feature}</li>`).join('')}
                     </ol>
                     <h5 class="card-tittle border-top mt-2">${ai.name}</h5>
                    <div class="d-flex justify-content-between mt-3"> 
                        <p>${ai.published_in}</p>
                        <a class="btn btn-primary" href="#" role="button">Details</a> 
                    </div> 
                </div>
            </div>
        `;
        aiContainer.appendChild(aiDiv);
    });
}
loadAiHub();
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
    // stop loader
    toggleSpinner(false);
}
const toggleSpinner = isLoading => {
    const loadersection = document.getElementById('loader');
    if(isLoading){
        displayAiHub(data.data.tools)
        loadersection.classList.remove('d-none');
    }
    else{
        loadersection.classList.add('d-none');
    }
}
// sort by date start
const sortAiHubByDate = () => {
    const aiHub = document.querySelectorAll('.col');
    const sortedAiHub = Array.from(aiHub).sort((a, b) => {
      const aDate = new Date(a.querySelector('p').textContent);
      const bDate = new Date(b.querySelector('p').textContent);
      return aDate - bDate;
    });
    const aiContainer = document.getElementById('ai-container');
    aiContainer.innerHTML = '';
    sortedAiHub.forEach(ai => {
      aiContainer.appendChild(ai);
    });
  };
  const sortByDateButton = document.querySelector('.btn-danger');
  sortByDateButton.addEventListener('click', sortAiHubByDate);
//   sort by date finished
  


loadAiHub();
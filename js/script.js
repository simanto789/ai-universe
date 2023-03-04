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
                        <p><i class="fa-regular fa-calendar-days me-2"></i>${ai.published_in}</p>
                        <button onclick="loadAiDetails('${ai.id}')" class="btn btn-light" href="#" data-bs-toggle="modal" data-bs-target="#aiDetailModal"><i class="fa-solid fa-arrow-right"></i></button> 
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
  if (isLoading) {
    displayAiHub(data.data.tools)
    loadersection.classList.remove('d-none');
  }
  else {
    loadersection.classList.add('d-none');
  }
}
// sort by date start
const sortAiHubByDate = () => {
  const aiHub = document.getElementsByClassName('col');
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
const loadAiDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayAiDetail(data.data);
}

const displayAiDetail = ai => {
  // console.log(ai);
  const modalTittle = document.getElementById('aiDetailModalLabel');
  modalTittle.innerText = ai.tool_name;
  const aiDetails = document.getElementById('ai-details');
  aiDetails.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
          <div id="myDiv" class="card">
            <div class="card-body">
              <h4 class="card-title mb-4">${ai.description}</h4>
              <div class="d-flex gap-2 justify-content-evenly row row-cols-1">
                <div class="border p-2 bg-white text-dark text-center fw-semibold">${ai.pricing[0].price + ai.pricing[0].plan}</div>
                <div class="border p-2 bg-white text-dark text-center fw-semibold">${ai.pricing[1].price + ai.pricing[1].plan}</div>
                <div class="border p-2 bg-white text-dark text-center fw-semibold">${ai.pricing[2].price + ai.pricing[2].plan}</div>
              </div>
              <div class = "d-flex gap-3 justify-content-between mt-4 ">
                  <div>
                  <h5>Features</h5>
                  <li>${ai.features['1'] ? ai.features['1'].feature_name : "no data found"}</li> 
                  <li>${ai.features['2'] ? ai.features['2'].feature_name : "no data found"}</li> 
                  <li>${ai.features['3'] ? ai.features['3'].feature_name : "no data found"}</li> 
                  </div> 
                  <div>
                  <h5>Integration</h5>
                   <ul mb-2> 
                       ${ai.integrations.map(integration => `<li>${integration}</li>`).join('')}
                     </ul>
                  </div> 
              </div>


            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="${ai.image_link['0']}" class="card-img-top p-4 " alt="...">
            <div id="accuracy" class=" position-absolute top-0 end-0 p-4 "><span class="badge text-bg-danger">${ai.accuracy.score * 100}% accuracy</span></div>
              <h5 class="text-center">${ai.input_output_examples['0'].input}</h5>
              <p class="text-center p-3">${ai.input_output_examples['0'].output ? ai.input_output_examples['0'].output : "no output found"}</p>
            </div>
          </div>
        </div>
      </div>
    `
  const accuracyDiv = document.getElementById('accuracy');
  if (accuracyDiv && accuracyDiv.innerText.includes('%')) {
    const accuracyScore = parseFloat(accuracyDiv.innerText.replace('% accuracy', ''));
    if (accuracyScore <= 0) {
      accuracyDiv.style.display = 'none';
    }
  }
  const myDiv = document.getElementById('myDiv');
  myDiv.style.cssText = 'background-color: #FFCCBC ';

}


loadAiHub();
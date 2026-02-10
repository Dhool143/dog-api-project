
async function fetchBreeds() {
    try {
      const response = await fetch('https://dogapi.dog/api/v2/breeds');
  
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
  
      const data = await response.json();
      displayBreeds(data.data);
    } catch (error) {
      console.error('Error fetching breeds:', error.message);
    }
  }
  
  function displayBreeds(breeds) {
    const list = document.getElementById('breed-list');
    list.innerHTML = '';
  
    breeds.forEach(breed => {
      const li = document.createElement('li');
      li.textContent = breed.attributes.name;
  
      li.addEventListener('click', () => {
        fetchBreedById(breed.id);
      });
  
      list.appendChild(li);
    });
  }
  
  async function fetchBreedById(id) {
    try {
      const response = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`);
  
      if (!response.ok) {
        throw new Error('Breed not found');
      }
  
      const data = await response.json();
      displayBreedDetails(data.data);
    } catch (error) {
      console.error('Error fetching breed details:', error.message);
    }
  }
  
  function displayBreedDetails(breed) {
    const details = document.getElementById('breed-details');
  
    details.innerHTML = `
      <h3>${breed.attributes.name}</h3>
      <p>${breed.attributes.description || 'No description available.'}</p>
      <p><strong>Life Span:</strong>
         ${breed.attributes.life.min} - ${breed.attributes.life.max} years</p>
    `;
  }
  
  async function fetchDogFacts() {
    try {
      const response = await fetch('https://dogapi.dog/api/v2/facts');
      const data = await response.json();
  
      displayFacts(data.data);
    } catch (error) {
      console.error('Error fetching dog facts:', error.message);
    }
  }
  
  function displayFacts(facts) {
    const list = document.getElementById('facts-list');
    list.innerHTML = '';
  
    facts.slice(0, 5).forEach(fact => {
      const li = document.createElement('li');
      li.textContent = fact.attributes.body;
      list.appendChild(li);
    });
  }
  
  fetchBreeds();
  fetchDogFacts();
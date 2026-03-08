document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button[data-button-type]');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove 'active-button' from all buttons
      buttons.forEach(btn => {
        btn.classList.remove('active-button');
        // Reset to default gray styles
        btn.classList.add('bg-gray-200', 'text-gray-500');
        btn.classList.remove('bg-blue-600', 'text-white');
      });

      // Add 'active-button' to the clicked button
      button.classList.add('active-button');
      // Apply active blue styles
      button.classList.remove('bg-gray-200', 'text-gray-500');
      button.classList.add('bg-blue-600', 'text-white');

      // You can also add logic here based on which button was clicked
      const buttonType = button.dataset.buttonType;
      console.log(`Button "${buttonType}" was clicked!`);
    });
  });
});

const allContainer = document.getElementById("all-container")
const loadingSpinner = document.getElementById("loadingSpinner")

const all = document.getElementById("all")
const total = displayAll.length;
all.textContent = all;
all.innerHTML = `${total} <span>Issues</span>`;

function showLoading (){
  loadingSpinner.classList.remove("hidden")
  allContainer.innerHTML = "";
}

function hideLoading (){
  loadingSpinner.classList.add("hidden")
}

async function allCard(){
  showLoading()
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  hideLoading()
  displayAll(data.data);
}

function displayAll(cards){
  console.log(cards);
  cards.forEach(card =>{
    console.log(card);
    const section = document.createElement("div");
    section.className = "card  bg-white shadow-sm"
    section.innerHTML = `
      <div class="p-4 border-t-2 border-green-500 rounded-md">
        <div class="flex justify-between">
          <div>
          <img class="px-2 py-2 " src="./assets/Open-Status.png" alt="">
          </div>
          <div>
            <button class="btn btn-soft btn-error px-7 py-2 rounded-full font-semibold">${card.priority}</button>
          </div>
        </div>
        <div>
          <h2 class="font-semibold">${card.title}</h2>
          <p class="text-[#64748B]">${card.description}</p>
          <div class="flex gap-2">
            <button class="btn btn-soft btn-secondary rounded-full"><i class="fa-solid fa-bug"></i>${card.labels[0]}</button>
            <button class="btn btn-soft btn-warning rounded-full"><i class="fa-regular fa-life-ring"></i>${card.labels[1]}</button>
            
          </div>
        </div>
        <div class="w-full mt-4">
          <div class="flex-grow h-px bg-gray-300 w-full"></div>
        </div>
        <div class="space-y-2 mt-2">
          <p class="text-[#64748B]">${card.author}</p>
          <p class="text-[#64748B]">${card.createdAt}</p>
        </div>
      </div>
      
    `
    allContainer.appendChild(section);
  })
}
allCard()
displayAll()


const count = document.getElementById("all");
document.addEventListener('DOMContentLoaded', async () => {
  const buttons = document.querySelectorAll('button[data-button-type]');

  buttons.forEach(button => {
    button.addEventListener('click', async () => {

      buttons.forEach(btn => {
        btn.classList.remove('active-button');
        btn.classList.add('bg-gray-200', 'text-gray-500');
        btn.classList.remove('bg-blue-600', 'text-white');
      });

      button.classList.add('active-button');
      button.classList.remove('bg-gray-200', 'text-gray-500');
      button.classList.add('bg-blue-600', 'text-white');

      const buttonType = button.dataset.buttonType;
      console.log(`Button "${buttonType}" was clicked!`);
      const data = await allCard()
      console.log(data);
      if (buttonType === "all") {
        displayAll(data)
      } else if (buttonType === "open") {
        const filteredData = data.filter(lesson => lesson.status === "open");
        displayAll(filteredData)
      }
      else {
        const filteredData = data.filter(lesson => lesson.status === "closed");
        displayAll(filteredData)
      }

    });
  });
});


const allContainer = document.getElementById("all-container");
const loadingSpinner = document.getElementById("loadingSpinner");
const modal = document.getElementById("card-modal");

const all = document.getElementById("all");

function showLoading() {
  loadingSpinner.classList.remove("hidden");
  allContainer.innerHTML = "";
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

async function allCard() {
  showLoading();

  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();

  hideLoading();

  const cards = data.data;

  // counter update
  const total = cards.length;
  all.innerHTML = `${total} <span>Issues</span>`;

  displayAll(cards);
  return cards
}


function displayAll(cards) {
  count.innerText = cards.length;
  console.log(cards);
  allContainer.innerHTML = "";
  cards.forEach(card => {
    const section = document.createElement("div");
    section.className = "card bg-white shadow-sm";
    let statusBorder = ""
    if(card.status == "open"){
      statusBorder = "border-green-500"
    }
    else{
      statusBorder = "border-purple-500"
    }
    
    let iconBtn = (card.status == "open") ? "./assets/Open-Status.png":"./assets/Closed- Status .png"
    section.innerHTML = `
      <div class="p-4 border-t-2 ${statusBorder} rounded-md " onclick="loadCardDetail(${card.id})">
      
        <div class="flex justify-between">
          <div>
            <img class="px-2 py-2" src="${iconBtn}" alt="">
          </div>

          <div>
            <button  class="btn btn-soft btn-error px-7 py-2 rounded-full font-semibold">
              ${card.priority}
            </button>
          </div>
        </div>

        <div>
          <h2 class="font-semibold">${card.title}</h2>
          <p class="text-[#64748B]">${card.description}</p>

          <div class="flex gap-2">
            <button class="btn btn-soft btn-secondary rounded-full">
              <i class="fa-solid fa-bug"></i> ${card.labels[0] || ""}
            </button>

            <button class="btn btn-soft btn-warning rounded-full">
              <i class="fa-regular fa-life-ring"></i> ${card.labels[1] ? card.labels[1] : "No Issue here" || ""}
            </button>
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
    `;

    allContainer.appendChild(section);
  });
}
allCard()

document.getElementById("btn-search").addEventListener("click",()=>{
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then(res => res.json())
  .then(data => {
    const allTitle = data.data;
    console.log(allTitle);
    const filterTitle = allTitle.filter(title=> title.title.toLowerCase().includes(searchValue));
    displayAll(filterTitle);
    
  })
})

const loadCardDetail =(id)=>{
  console.log(id);
  const modal = document.querySelector("#modal")
  
  
  const modalCard = document.getElementById("card_modal")
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  console.log(url);
  fetch(url)
  .then(res => res.json())
  .then((data) => {
    const issue = data.data
    modal.innerHTML = `
       <div class="p-4 border-t-2 border-green-500 rounded-md space-y-4">
          <div class="flex justify-between">
            <div>
            <img class="px-2 py-2 " src="./assets/Open-Status.png" alt="">
            </div>
            <div>
              <button class="btn btn-soft btn-error px-7 py-2 rounded-full font-semibold">${issue.priority}</button>
            </div>
          </div>
          <div>
            <button class="btn btn-active btn-success text-white rounded-full">${issue.status}</button>
            <span><i class="fa-solid fa-circle text-gray-400"></i> Opened by Ferdous Ahmed</span>
            <span><i class="fa-solid fa-circle text-gray-400"></i> 22/02/2026</span>
          </div>
          <div>
            <h2 class="font-semibold">${issue.title}</h2>
            <p class="text-[#64748B]">${issue.description}</p>
            <div class="flex gap-2">
              <button class="btn btn-soft btn-secondary rounded-full"><i class="fa-solid fa-bug"></i>${issue.labels[0] || ""}</button>
              <button class="btn btn-soft btn-warning rounded-full"><i class="fa-regular fa-life-ring"></i> ${issue.labels[1] ? issue.labels[1] : "No Issue here" || ""}</button>
            
            </div>
          </div>
          <div class="w-full mt-4">
            <div class="flex-grow h-px bg-gray-300 w-full"></div>
          </div>
          <div class="space-y-2 mt-2">
            <p class="text-[#64748B]">${issue.assignee ? issue.assignee : "No Data Here"}</p>
            <p class="text-[#64748B]">${issue.updatedAt}</p>
          </div>
        </div>`
    modalCard.showModal()
  }
  
  )
}

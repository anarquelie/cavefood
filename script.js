const colors = {
  "proscrire": "#ff3b30",
  "déconseillé": "#ff3b30",
  "conseillé": "#34c759",
  "très conseillé": "#32d74b",
  "avec moderation": "#ffcc00"
};

const answers = {
  "proscrire": "❌ Non, c’est toxique !",
  "déconseillé": "🚫 Non, à éviter !",
  "avec moderation": "☝️ Oui, mais avec modération !",
  "conseillé": "✅ Oui, sans problème !",
  "très conseillé": "🌟 Oui, c’est excellent !"
};

const tagline = document.getElementById('tagline');
const searchInput = document.getElementById('search');
const dropdown = document.getElementById('dropdown');
const detailDiv = document.getElementById('detail');

let foods = [];

// Load JSON data
fetch('foods.json')  // <== use your actual filename here (e.g. foods_full.json)
  .then(response => response.json())
  .then(data => {
    foods = data;
    if (foods.length > 0) {
      const randomFood = foods[Math.floor(Math.random() * foods.length)];
      searchInput.placeholder = `Exemple: ${randomFood.name}`;
    }
  })
  .catch(err => console.error("Error loading data:", err));

function showDropdown(filtered) {
  dropdown.innerHTML = '';
  if(filtered.length === 0) {
    dropdown.style.display = 'none';
    return;
  }
  filtered.forEach(food => {
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.textContent = `${food.emoji || ''} ${food.name}`;
    item.onclick = () => showDetail(food);
    dropdown.appendChild(item);
  });
  dropdown.style.display = 'block';
}

function lightenColor(hex, percent) {
  let num = parseInt(hex.replace('#',''),16);
  let r = (num >> 16) + Math.round((255 - (num >> 16)) * (percent/100));
  let g = ((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * (percent/100));
  let b = (num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * (percent/100));
  return `rgb(${r},${g},${b})`;
}

function showDetail(food) {
  dropdown.style.display = 'none';
  searchInput.value = '';
  searchInput.placeholder = '';

  tagline.textContent = answers[food.category] || "ℹ️ Information indisponible";

  // Restore background gradient based on food category color
  const baseColor = colors[food.category] || "#2193b0";
  const lightColor = lightenColor(baseColor, 60);
  document.body.style.background = `linear-gradient(145deg, ${lightColor}, ${baseColor})`;

  const capitalizedName = food.name.charAt(0).toUpperCase() + food.name.slice(1);

  detailDiv.innerHTML = `
  <div class="card-horizontal" style="display: flex; flex-direction: column; padding: 16px 20px; align-items: flex-start;">
    <div style="display: flex; width: 100%; align-items: center; justify-content: space-between; margin-bottom: ${food.comment ? '8px' : '0'};">
      <div class="icon-container-horizontal" style="width: 60px; height: 60px; font-size: 48px; display: flex; align-items: center; justify-content: center;">
        ${food.emoji || ''}
      </div>
      <div style="display: flex; flex-direction: column; justify-content: center; margin: 0 16px; flex-grow: 1;">
        <p class="message-text" style="font-size: 18px; font-weight: 600; margin: 0;">${capitalizedName}</p>
        <p class="sub-text" style="font-size: 14px; color: #555; margin: 4px 0 0 0;">${food.category}</p>
      </div>
      <div class="vitc-bottom-horizontal">C=${food.vitC ? food.vitC: '🤔'}</div>
    </div>
    ${food.comment ? `<p class="comment" style="font-style:italic; margin:0;">${food.comment}</p>` : ''}
  </div>
`;
}

// Restore initial question when search cleared
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  if (!query) {
    dropdown.style.display = 'none';
    detailDiv.innerHTML = '';
    tagline.textContent = "Le cochon d’Inde peut-il manger ça ?";
    document.body.style.background = "#f2f2f7";
    return;
  }
  const filtered = foods.filter(f => f.name.toLowerCase().includes(query));
  showDropdown(filtered);
});
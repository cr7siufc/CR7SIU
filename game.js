let currentPoints = 0;
let totalPoints = 0;
let tokens = 0;
const dailyLimit = 5000;
const refillCost = 1000;
const attributeBaseCost = 500;
const attributeIncrement = 200;
let attributes = Array.from({ length: 20 }, (_, i) => ({
    name: `Attribute ${i + 1}`,
    level: 0,
    cost: attributeBaseCost + i * attributeIncrement
}));

// Update UI
function updateUI() {
    document.getElementById('current-points').textContent = currentPoints;
    document.getElementById('total-points').textContent = totalPoints;
    document.getElementById('tokens').textContent = tokens;

    const attributesList = document.getElementById('attributes-list');
    attributesList.innerHTML = '';
    attributes.forEach((attr, index) => {
        const attrDiv = document.createElement('div');
        attrDiv.className = 'attribute-item';
        attrDiv.innerHTML = `
            <h4>${attr.name}</h4>
            <p>Level: ${attr.level}</p>
            <p>Upgrade Cost: ${attr.cost} points</p>
            <button onclick="upgradeAttribute(${index})">Upgrade</button>
        `;
        attributesList.appendChild(attrDiv);
    });
}

// Tap to earn points
document.getElementById('tap-button').addEventListener('click', () => {
    if (currentPoints < dailyLimit) {
        currentPoints++;
        totalPoints++;
        updateUI();
    } else {
        alert('Daily limit reached!');
    }
});

// Refill points
document.getElementById('refill-button').addEventListener('click', () => {
    if (totalPoints >= refillCost) {
        currentPoints += refillCost;
        totalPoints -= refillCost;
        updateUI();
    } else {
        alert('Not enough points to refill!');
    }
});

// Upgrade attributes
function upgradeAttribute(index) {
    const attribute = attributes[index];
    if (totalPoints >= attribute.cost) {
        totalPoints -= attribute.cost;
        attribute.level++;
        attribute.cost += attributeIncrement;
        updateUI();
    } else {
        alert('Not enough points to upgrade this attribute!');
    }
}

// Convert points to tokens
document.getElementById('convert-button').addEventListener('click', () => {
    if (totalPoints >= 100) {
        const convertibleTokens = Math.floor(totalPoints / 100);
        tokens += convertibleTokens;
        totalPoints -= convertibleTokens * 100;
        updateUI();
    } else {
        alert('Not enough points to convert!');
    }
});

// Initialize
updateUI();
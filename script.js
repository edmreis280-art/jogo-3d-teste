// Dados Iniciais
let player = JSON.parse(localStorage.getItem('soloLevelingPlayer')) || {
    level: 1,
    xp: 0,
    stats: { for: 10, int: 10, res: 10, dis: 10 }
};

const quests = [
    { id: 1, title: "Treino de Força", xp: 50, stat: 'for', desc: "30 min de academia" },
    { id: 2, title: "Estudo Profundo", xp: 60, stat: 'int', desc: "Ler 10 páginas" },
    { id: 3, title: "Resiliência Cardia", xp: 40, stat: 'res', desc: "Correr 2km" },
    { id: 4, title: "Foco Financeiro", xp: 30, stat: 'dis', desc: "Registrar gastos" }
];

function updateUI() {
    const nextLevelXP = player.level * 100;
    document.getElementById('level-val').innerText = player.level;
    document.getElementById('current-xp').innerText = player.xp;
    document.getElementById('next-level-xp').innerText = nextLevelXP;
    
    // Stats
    document.getElementById('stat-for').innerText = player.stats.for;
    document.getElementById('stat-int').innerText = player.stats.int;
    document.getElementById('stat-res').innerText = player.stats.res;
    document.getElementById('stat-dis').innerText = player.stats.dis;

    // Barra de Progresso
    const percent = (player.xp / nextLevelXP) * 100;
    document.getElementById('xp-fill').style.width = percent + "%";
    
    saveGame();
}

function completeQuest(id) {
    const quest = quests.find(q => q.id === id);
    player.xp += quest.xp;
    player.stats[quest.stat] += 1;

    checkLevelUp();
    updateUI();
}

function checkLevelUp() {
    let nextLevelXP = player.level * 100;
    if (player.xp >= nextLevelXP) {
        player.xp -= nextLevelXP;
        player.level++;
        showLevelUpModal();
    }
}

function showLevelUpModal() {
    document.getElementById('level-up-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('level-up-modal').classList.add('hidden');
}

function saveGame() {
    localStorage.setItem('soloLevelingPlayer', JSON.stringify(player));
}

function renderQuests() {
    const list = document.getElementById('quest-list');
    list.innerHTML = quests.map(q => `
        <div class="quest-card">
            <div>
                <strong style="color: var(--neon-blue)">${q.title}</strong>
                <p style="font-size: 0.8rem; margin: 5px 0;">${q.desc} (+${q.xp} XP)</p>
            </div>
            <button onclick="completeQuest(${q.id})">CONCLUIR</button>
        </div>
    `).join('');
}

// Inicializar
renderQuests();
updateUI();

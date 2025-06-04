const questions = [
    {
        question: "Koji je osnovni cilj u hrvanju?",
        options: ["Pobjeći iz kruga", "Srušiti protivnika na pod i kontrolirati ga", "Udaranje protivnika", "Pogađanje ciljeva"],
        answer: 1
    },
    {
        question: "Koliko traje jedna runda u hrvanju (za mlađe uzraste)?",
        options: ["1 minuta", "2 minute", "3 minute", "5 minuta"],
        answer: 1
    },
    {
        question: "Koje od navedenog NIJE dio hrvačke opreme?",
        options: ["Hrvačke tenisice", "Dres", "Boksačke rukavice", "Znojnik"],
        answer: 2
    }
];

function loadQuiz() {
    const container = document.getElementById('quiz-container');
    questions.forEach((q, i) => {
        const qBlock = document.createElement('div');
        qBlock.classList.add('mb-4');
        qBlock.innerHTML = `
            <p><strong>${i + 1}. ${q.question}</strong></p>
            ${q.options.map((opt, idx) => `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="question${i}" id="q${i}o${idx}" value="${idx}">
                    <label class="form-check-label" for="q${i}o${idx}">
                        ${opt}
                    </label>
                </div>
            `).join('')}
        `;
        container.appendChild(qBlock);
    });
}

function submitQuiz() {
    let score = 0;
    questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="question${i}"]:checked`);
        if (selected && parseInt(selected.value) === q.answer) {
            score++;
        }
    });

    const result = document.getElementById('quiz-result');
    result.textContent = `Rezultat: ${score} od ${questions.length} točno.`;
    result.classList.add('fw-bold');
}

window.onload = loadQuiz;

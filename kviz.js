const questions = [
    {
        type: "multiple",
        question: "Koji je osnovni cilj u hrvanju?",
        options: ["Pobjeći iz kruga", "Srušiti protivnika na pod i kontrolirati ga", "Udaranje protivnika", "Pogađanje ciljeva"],
        answer: 1
    },
    {
        type: "multiple",
        question: "Koliko traje jedna runda u hrvanju (za mlađe uzraste)?",
        options: ["1 minuta", "2 minute", "3 minute", "5 minuta"],
        answer: 1
    },
    {
        type: "multiple",
        question: "Koje od navedenog NIJE dio hrvačke opreme za trening?",
        options: ["Hrvačke tenisice", "Dres", "Boksačke rukavice", "Majica"],
        answer: 2
    },
    {
        type: "truefalse",
        question: "Hrvanje je kontaktni sport.",
        answer: true
    },
    {
        type: "truefalse",
        question: "U hrvanju je dozvoljeno udaranje protivnika.",
        answer: false
    },
    {
        type: "text",
        question: "Kako se zove prostor na kojem se održava hrvačka borba (jednom riječju)?",
        answer: ["strunjača", "strunjaca", "Strunjača", "Strunjaca"]
    },
    {
        type: "text",
        question: "Kako se zove završna tehnika kojom hrvač može pobijediti meč?",
        answer: ["tuš", "tus", "Tuš", "Tus"]
    },
    {
        type: "multiple_answers",
        question: "Koje od navedenih osobina su važne za uspješnog hrvača?",
        options: ["Snaga", "Brzina", "Strpljenje", "Izdržljivost"],
        answer: [0, 1, 3]
    },
    {
        type: "multiple_answers",
        question: "Koje se radnje smiju koristiti u hrvanju?",
        options: ["Hvatovi", "Udaranje šakom", "Rušenja", "Gušenja"],
        answer: [0, 2]
    },
    {
        type: "multiple_answers",
        question: "Što je važno za sigurno treniranje hrvanja?",
        options: ["Zagrijavanje prije treninga", "Nošenje pravilne opreme", "Borba bez nadzora", "Poštivanje pravila"],
        answer: [0, 1, 3]
    }
];

function loadQuiz() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    questions.forEach((q, i) => {
        const qBlock = document.createElement('div');
        qBlock.classList.add('mb-4');
        let innerHTML = `<p><strong>${i + 1}. ${q.question}</strong></p>`;

        if (q.type === "multiple") {
            innerHTML += q.options.map((opt, idx) => `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="question${i}" id="q${i}o${idx}" value="${idx}">
                    <label class="form-check-label" for="q${i}o${idx}">
                        ${opt}
                    </label>
                </div>
            `).join('');
        } else if (q.type === "truefalse") {
            innerHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="question${i}" id="q${i}true" value="true">
                    <label class="form-check-label" for="q${i}true">Točno</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="question${i}" id="q${i}false" value="false">
                    <label class="form-check-label" for="q${i}false">Netočno</label>
                </div>
            `;
        } else if (q.type === "text") {
            innerHTML += `<input type="text" class="form-control mt-2" name="question${i}" id="q${i}text">`;
        }
        else if (q.type === "multiple_answers") {
            innerHTML += q.options.map((opt, idx) => `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="question${i}" id="q${i}o${idx}" value="${idx}">
                    <label class="form-check-label" for="q${i}o${idx}">
                        ${opt}
                    </label>
                </div>
            `).join('');
        }

        qBlock.innerHTML = innerHTML;
        container.appendChild(qBlock);
    });
}

function submitQuiz() {
    let score = 0;
    questions.forEach((q, i) => {
        if (q.type === "multiple" || q.type === "truefalse") {
            const selected = document.querySelector(`input[name="question${i}"]:checked`);
            if (selected) {
                const userAnswer = q.type === "truefalse" ? (selected.value === "true") : parseInt(selected.value);
                if (userAnswer === q.answer) {
                    score++;
                }
            }
        } else if (q.type === "text") {
            const input = document.querySelector(`#q${i}text`);
            if (input && input.value.trim().toLowerCase() === q.answer.toLowerCase()) {
                score++;
            }
        }
        else if (q.type === "multiple_answers") {
            const selected = document.querySelectorAll(`input[name="question${i}"]:checked`);
            const userAnswers = Array.from(selected).map(el => parseInt(el.value)).sort();
            const correctAnswers = q.answer.slice().sort();
            if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)) {
                score++;
            }
        }
    });

    const result = document.getElementById('quiz-result');
    result.textContent = `Rezultat: ${score} od ${questions.length} točno.`;
    result.classList.add('fw-bold');
}

window.onload = loadQuiz;

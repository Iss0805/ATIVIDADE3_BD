const form = document.querySelector('#add-aluno-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    db.collection('BD3-NoSQL-Firestore').add({
        nome: form.nome.value,
        cof: form.cof.value,
        cpf: form.cpf.value,
        rg: form.rg.value,
        telefone_aluno: form.telefone_aluno.value,
        telefone_responsavel: form.telefone_responsavel.value,
        email: form.email.value,
        date_nascimento: new Date(form.date_nascimento.value)
    })
    .then((docRef) => {
        console.log("Aluno inserido com ID: ", docRef.id);
        form.reset();
        loadAlunos();
    })
    .catch((error) => {
        console.error("Erro ao adicionar aluno: ", error);
    });
});

function renderList(doc) {
    let li = document.createElement('li');
    let alunoData = doc.data();

    let nome = document.createElement('span');
    let cof = document.createElement('span');
    let cpf = document.createElement('span');
    let rg = document.createElement('span');
    let telefoneAluno = document.createElement('span');
    let telefoneResponsavel = document.createElement('span');
    let email = document.createElement('span');
    let dateNascimento = document.createElement('span');

    nome.textContent = `Nome: ${alunoData.nome}`;
    cof.textContent = `COF: ${alunoData.cof}`;
    cpf.textContent = `CPF: ${alunoData.cpf}`;
    rg.textContent = `RG: ${alunoData.rg || 'Não informado'}`;
    telefoneAluno.textContent = `Telefone Aluno: ${alunoData.telefone_aluno}`;
    telefoneResponsavel.textContent = `Telefone Responsável: ${alunoData.telefone_responsavel || 'Não informado'}`;
    email.textContent = `Email: ${alunoData.email}`;
    dateNascimento.textContent = `Data de Nascimento: ${new Date(alunoData.date_nascimento.seconds * 1000).toLocaleDateString()}`;

    li.appendChild(nome);
    li.appendChild(cof);
    li.appendChild(cpf);
    li.appendChild(rg);
    li.appendChild(telefoneAluno);
    li.appendChild(telefoneResponsavel);
    li.appendChild(email);
    li.appendChild(dateNascimento);

    document.getElementById('aluno-list').appendChild(li);
}

function loadAlunos() {
    db.collection('BD3-NoSQL-Firestore').get()
    .then(snapshot => {
        snapshot.docs.forEach(doc => {
            renderList(doc);
        });
    })
    .catch(error => {
        console.log("Erro ao carregar alunos: ", error);
    });
}

loadAlunos();

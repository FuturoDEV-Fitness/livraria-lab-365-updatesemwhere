const readline = require('readline/promises');
const Leitor = require('./models/Leitor');
const LeitorCrud = require('./models/LeitorCrud');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function run() {
    const leitorCrud = new LeitorCrud();

    const resposta = await rl.question('Escolha uma ação (criar, deletar, consultar): ');

    switch (resposta) {
        case 'criar': {
            const codigo = await rl.question('Código: ');
            const nome = await rl.question('Nome: ');
            const cpf = await rl.question('CPF: ');
            const dataNascimento = await rl.question('Data de Nascimento: ');

            const leitor = new Leitor(codigo, nome, cpf, dataNascimento);
            await leitorCrud.criar(leitor);
            console.log('Leitor criado com sucesso!');
            rl.close();
            break;
        }
        case 'deletar': {
            const codigo = await rl.question('Código do leitor a deletar: ');
            await leitorCrud.deletar(codigo);
            console.log('Leitor deletado com sucesso!');
            rl.close();
            break;
        }
        case 'consultar': {
            const codigo = await rl.question('Código do leitor a consultar: ');
            const leitor = await leitorCrud.consultar(codigo);
            if (leitor) {
                console.log('Leitor encontrado:', leitor);
            } else {
                console.log('Leitor não encontrado.');
            }
            rl.close();
            break;
        }
        default:
            console.log("Ação não reconhecida.");
            rl.close();
    }
}

run();

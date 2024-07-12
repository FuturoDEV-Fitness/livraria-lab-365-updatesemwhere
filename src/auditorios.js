const readline = require('readline/promises');
const Auditorio = require('./models/Auditorio');
const AuditorioCrud = require('./models/AuditorioCrud');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function run() {
    const auditorioCrud = new AuditorioCrud();

    const resposta = await rl.question('Escolha uma ação (criar, deletar, consultar): ');

    switch (resposta) {
        case 'criar': {
            const codigo = await rl.question('Código: ');
            const nome = await rl.question('Nome: ');
            const descricao = await rl.question('Descrição: ');
            const capacidade = await rl.question('Quantidade de pessoas suportado: ');

            const auditorio = new Auditorio(codigo, nome, descricao, capacidade);
            await auditorioCrud.criar(auditorio);
            console.log('Auditório criado com sucesso!');
            rl.close();
            break;
        }
        case 'deletar': {
            const codigo = await rl.question('Código do auditório a deletar: ');
            await auditorioCrud.deletar(codigo);
            console.log('Auditório deletado com sucesso!');
            rl.close();
            break;
        }
        case 'consultar': {
            const codigo = await rl.question('Código do auditório a consultar: ');
            const auditorio = await auditorioCrud.consultar(codigo);
            if (auditorio) {
                console.log('Auditório encontrado:', auditorio);
            } else {
                console.log('Auditório não encontrado.');
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

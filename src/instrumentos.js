const readline = require('readline/promises');
const Instrumento = require('../models/Instrumento');
const InstrumentoCrud = require('../models/InstrumentoCrud');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function run() {
    const instrumentoCrud = new InstrumentoCrud();

    const resposta = await rl.question('Escolha uma ação (criar, deletar, consultar): ');

    switch (resposta) {
        case 'criar': {
            const codigo = await rl.question('Código: ');
            const nome = await rl.question('Nome: ');
            const tipo = await rl.question('Tipo: ');
            const estado = await rl.question('Estado: ');

            const instrumento = new Instrumento(codigo, nome, tipo, estado);
            await instrumentoCrud.criar(instrumento);
            console.log('Instrumento criado com sucesso!');
            rl.close();
            break;
        }
        case 'deletar': {
            const codigo = await rl.question('Código do instrumento a deletar: ');
            await instrumentoCrud.deletar(codigo);
            console.log('Instrumento deletado com sucesso!');
            rl.close();
            break;
        }
        case 'consultar': {
            const codigo = await rl.question('Código do instrumento a consultar: ');
            const instrumento = await instrumentoCrud.consultar(codigo);
            if (instrumento) {
                console.log('Instrumento encontrado:', instrumento);
            } else {
                console.log('Instrumento não encontrado.');
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

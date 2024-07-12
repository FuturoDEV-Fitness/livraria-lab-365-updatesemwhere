const readline = require('readline/promises');
const Livro = require('./models/Livro');
const LivroCrud = require('./models/LivroCrud');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function run() {
    const livroCrud = new LivroCrud();

    const resposta = await rl.question('Escolha uma ação (criar, deletar, consultar): ');

    switch (resposta) {
        case 'criar': {
            const codigo = await rl.question('Código: ');
            const nome = await rl.question('Nome: ');
            const paginas = await rl.question('Quantidade de páginas: ');
            const genero = await rl.question('Gênero: ');
            const autor = await rl.question('Autor: ');

            const livro = new Livro(codigo, nome, paginas, genero, autor);
            await livroCrud.criar(livro);
            console.log('Livro criado com sucesso!');
            rl.close();
            break;
        }
        case 'deletar': {
            const codigo = await rl.question('Código do livro a deletar: ');
            await livroCrud.deletar(codigo);
            console.log('Livro deletado com sucesso!');
            rl.close();
            break;
        }
        case 'consultar': {
            const codigo = await rl.question('Código do livro a consultar: ');
            const livro = await livroCrud.consultar(codigo);
            if (livro) {
                console.log('Livro encontrado:', livro);
            } else {
                console.log('Livro não encontrado.');
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

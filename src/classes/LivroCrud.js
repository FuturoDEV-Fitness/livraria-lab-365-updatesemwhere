const fs = require('fs/promises');
const path = require('path');
const Livro = require('./Livro');

class LivroCrud {
    constructor() {
        this.filePath = path.join(__dirname, '../files/livros.json');
    }

    async lerArquivo() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                throw error;
            }
        }
    }

    async escreverArquivo(data) {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async criar(livro) {
        const livros = await this.lerArquivo();
        livros.push(livro);
        await this.escreverArquivo(livros);
    }

    async deletar(codigo) {
        let livros = await this.lerArquivo();
        livros = livros.filter(livro => livro.codigo !== codigo);
        await this.escreverArquivo(livros);
    }

    async consultar(codigo) {
        const livros = await this.lerArquivo();
        return livros.find(livro => livro.codigo === codigo);
    }
}

module.exports = LivroCrud;

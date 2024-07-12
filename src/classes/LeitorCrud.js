const fs = require('fs/promises');
const path = require('path');
const Leitor = require('./Leitor');

class LeitorCrud {
    constructor() {
        this.filePath = path.join(__dirname, '../files/leitores.json');
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

    async criar(leitor) {
        const leitores = await this.lerArquivo();
        leitores.push(leitor);
        await this.escreverArquivo(leitores);
    }

    async deletar(codigo) {
        let leitores = await this.lerArquivo();
        leitores = leitores.filter(leitor => leitor.codigo !== codigo);
        await this.escreverArquivo(leitores);
    }

    async consultar(codigo) {
        const leitores = await this.lerArquivo();
        return leitores.find(leitor => leitor.codigo === codigo);
    }
}

module.exports = LeitorCrud;

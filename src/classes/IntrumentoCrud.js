const fs = require('fs/promises');
const path = require('path');
const Instrumento = require('./Instrumento');

class InstrumentoCrud {
    constructor() {
        this.filePath = path.join(__dirname, '../files/instrumentos.json');
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

    async criar(instrumento) {
        const instrumentos = await this.lerArquivo();
        instrumentos.push(instrumento);
        await this.escreverArquivo(instrumentos);
    }

    async deletar(codigo) {
        let instrumentos = await this.lerArquivo();
        instrumentos = instrumentos.filter(instrumento => instrumento.codigo !== codigo);
        await this.escreverArquivo(instrumentos);
    }

    async consultar(codigo) {
        const instrumentos = await this.lerArquivo();
        return instrumentos.find(instrumento => instrumento.codigo === codigo);
    }
}

module.exports = InstrumentoCrud;

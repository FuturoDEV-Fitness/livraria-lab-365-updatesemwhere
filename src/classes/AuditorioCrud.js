const fs = require('fs/promises');
const path = require('path');
const Auditorio = require('./Auditorio');

class AuditorioCrud {
    constructor() {
        this.filePath = path.join(__dirname, '../files/auditorios.json');
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

    async criar(auditorio) {
        const auditorios = await this.lerArquivo();
        auditorios.push(auditorio);
        await this.escreverArquivo(auditorios);
    }

    async deletar(codigo) {
        let auditorios = await this.lerArquivo();
        auditorios = auditorios.filter(auditorio => auditorio.codigo !== codigo);
        await this.escreverArquivo(auditorios);
    }

    async consultar(codigo) {
        const auditorios = await this.lerArquivo();
        return auditorios.find(auditorio => auditorio.codigo === codigo);
    }
}

module.exports = AuditorioCrud;

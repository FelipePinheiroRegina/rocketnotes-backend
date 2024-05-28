const fs = require("fs")
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage {
    // uma promessa para salvar o arquivo
    async saveFile(file) {
        await fs.promises.rename(
            // metodo rename passa o arquivo de um lugar para o outro
            path.resolve(uploadConfig.TMP_FOLDER, file), // pegando o arquivo da pasta temporaria
            path.resolve(uploadConfig.UPLOADS_FOLDER, file) // colocando o arquivo na pasta de uploads
        )

        return file
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file) // pega o arquivo da pasta upload

        try {
            await fs.promises.stat(filePath) // método que retorna informações sobre o arquivo em questão como: tamanho, data de criação e modificação
        } catch {
            return
        }

        await fs.promises.unlink(filePath) // Apaga de fato o arquivo
    }
}

module.exports = DiskStorage
import crypto from 'crypto';
import logger from '@/services/logger/logger';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const TAG_LENGTH = 16;

/**
 * Obtém a chave de criptografia das variáveis de ambiente
 * Se não existir, gera uma chave aleatória (apenas para desenvolvimento)
 */
function getEncryptionKey(): Buffer {
    const keyFromEnv = process.env.CRYPTO_KEY;

    if (!keyFromEnv) {
        logger.warn('[CRYPTO]: CRYPTO_KEY não encontrada nas variáveis de ambiente!');
        logger.warn('[CRYPTO]: Usando chave temporária - APENAS PARA DESENVOLVIMENTO!');

        if (process.env.NODE_ENV === 'production') {
            throw new Error('CRYPTO_KEY é obrigatória em produção!');
        }

        return crypto.randomBytes(32);
    }

    if (keyFromEnv.length === 64) {
        return Buffer.from(keyFromEnv, 'hex');
    }

    return crypto.pbkdf2Sync(keyFromEnv, 'salt', 100000, 32, 'sha256');
}

/**
 * Criptografa um texto usando AES-256-GCM
 * @param text - Texto a ser criptografado
 * @returns String criptografada em formato base64 (IV + AuthTag + CipherText)
 */
export function encrypt(text: string): string {
    try {
        if (!text || text.trim() === '') {
            logger.warn('[CRYPTO]: Tentativa de criptografar texto vazio');
            return '';
        }

        const key = getEncryptionKey();
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(ALGORITHM, new Uint8Array(key), new Uint8Array(iv));
        cipher.setAAD(new Uint8Array(Buffer.from('additional-data')));

        const encrypted = Buffer.concat([
            new Uint8Array(cipher.update(text)),
            new Uint8Array(cipher.final()),
        ]);

        const authTag = cipher.getAuthTag();
        const combined = Buffer.concat([
            new Uint8Array(iv),
            new Uint8Array(authTag),
            new Uint8Array(encrypted),
        ]);

        const result = combined.toString('base64');
        logger.debug('[CRYPTO]: Texto criptografado com sucesso');
        return result;

    } catch (error) {
        logger.error(`[CRYPTO]: Erro ao criptografar texto - ${error}`);
        throw new Error('Falha na criptografia');
    }
}

/**
 * Descriptografa um texto usando AES-256-GCM
 * @param encryptedData - Dados criptografados em base64
 * @returns Texto descriptografado
 */
export function decrypt(encryptedData: string): string {
    try {
        if (!encryptedData || encryptedData.trim() === '') {
            logger.warn('[CRYPTO]: Tentativa de descriptografar dados vazios');
            return '';
        }

        const key = getEncryptionKey();
        const combined = Buffer.from(encryptedData, 'base64');

        const iv = combined.subarray(0, IV_LENGTH);
        const authTag = combined.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
        const encrypted = combined.subarray(IV_LENGTH + TAG_LENGTH);

        const decipher = crypto.createDecipheriv(ALGORITHM, new Uint8Array(key), new Uint8Array(iv));
        decipher.setAAD(new Uint8Array(Buffer.from('additional-data')));
        decipher.setAuthTag(new Uint8Array(authTag));

        let decrypted = decipher.update(new Uint8Array(encrypted), undefined, 'utf8');
        decrypted += decipher.final('utf8');

        logger.debug('[CRYPTO]: Texto descriptografado com sucesso');
        return decrypted;

    } catch (error) {
        logger.error(`[CRYPTO]: Erro ao descriptografar dados - ${error}`);
        throw new Error('Falha na descriptografia - dados podem estar corrompidos');
    }
}

logger.info('[CRYPTO]: Módulo de criptografia AES-256-GCM inicializado');
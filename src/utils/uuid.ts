export const REGEX_UUID_WITH_HYPHEN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/gi;
export const REGEX_UUID_WITHOUT_HYPHEN = /^[0-9a-f]{32}$/gi;

export const isUUID = (uuid: string) => REGEX_UUID_WITH_HYPHEN.test(uuid) || REGEX_UUID_WITHOUT_HYPHEN.test(uuid);

export const formatUUID = (uuid: string) => REGEX_UUID_WITH_HYPHEN.test(uuid) ? uuid : `${uuid.substring(0, 8)}-${uuid.substring(8, 12)}-${uuid.substring(12, 16)}-${uuid.substring(16, 20)}-${uuid.substring(20, 32)}`;

export const fromBinaryUUID = (buffer: Buffer) => formatUUID(buffer.toString('hex'));

export const toBinaryUUID = (uuid: string) => Buffer.from(uuid.replace(/-/g, ''), 'hex');

/**
 * PrismaのBigIntフィールドを文字列に変換するユーティリティ
 */

/**
 * オブジェクト内のBigIntを文字列に変換し、DateオブジェクトをISO文字列に変換する
 */
export function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'bigint') {
    return obj.toString();
  }

  // DateオブジェクトをISO文字列に変換
  if (obj instanceof Date) {
    if (isNaN(obj.getTime())) {
      return null;
    }
    return obj.toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt);
  }

  if (typeof obj === 'object') {
    const result: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = serializeBigInt(obj[key]);
      }
    }
    return result;
  }

  return obj;
}

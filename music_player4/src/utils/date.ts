import { format } from 'date-fns';

/**
 * @desc 两个毫秒级相减转换为整数，计算时间差
 * @param newTime - Number
 * @param oldTime - Number
 * @returns 返回数字天数
 */

export const diffDays = (newTime: number, oldTime: number): number =>
  Math.floor((newTime - oldTime) / 1000 / 60 / 60 / 24);

/**
 * @desc 小于10000显示原值，大于一万显示 ...万
 * @param number - Number
 * @returns 返回处理过的字符串或者数字- String | Number
 */

export const showNum = (number = 0): string | number => {
  let toStr = number + '';
  if (toStr.split('').length > 4) {
    return parseInt(number / 10000 + '') + '万';
  } else {
    return number;
  }
};

/**
 * @desc 将时间戳转换为指定格式的日期；入参可以是秒级时间戳、毫秒级时间戳；
 * 如果入参是秒级时间戳（10位），会乘以1000转换；格式默认为'yyyy-MM-dd HH:mm'；
 * 主要场景：通常情况下时间戳转换日期不传格式，而是用默认格式；后端返回的时间戳一般是秒级时间戳，如果直接用date-fns需要自己乘1000传入
 * @param date - Date | Number
 * @param formatStr - String
 * @returns 返回格式化后的秒级时间戳 - Number
 * @example
 * ```
 * formatDate(1658320372161) // 2022-07-20 20:32
 * format(1658320372, 'yyyy-MM-dd HH:mm') // 1970-01-20 12:38
 * formatDate(1658320372) // 2022-07-20 20:32
 * formatDate(new Date()) //  2022-07-21 11:28
 * formatDate(1658320372000, 'yyyy/MM/dd HH:mm:ss') // 2022/07/20 20:32:52
 * ```
 */

export const formatDate = (date: number | Date, formatStr = 'yyyy-MM-dd HH:mm') => {
  if (typeof date === 'number' && date.toString().length === 10) {
    return format(date * 1000, formatStr);
  } else {
    return format(date, formatStr);
  }
};

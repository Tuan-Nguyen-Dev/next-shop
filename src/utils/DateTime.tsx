import { numberToString } from "./numberToString";

export class DateTime {
  static getDate = (date: any) => {
    const newDate = new Date(date);

    return `${numberToString(newDate.getDate())}/${numberToString(
      newDate.getMonth() + 1
    )}/${newDate.getFullYear()}`;
  };

  static getFullTimeString = (date: number) => {
    const newDate = new Date(date);

    return `${numberToString(newDate.getHours())}:${numberToString(
      newDate.getMinutes()
    )} ${numberToString(newDate.getDate())}/${numberToString(
      newDate.getMonth() + 1
    )}/${newDate.getFullYear()}`;
  };
}

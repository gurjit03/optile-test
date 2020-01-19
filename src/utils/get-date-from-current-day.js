import moment from "moment";
import { DATE_FORMAT } from "../config";

// @Function returns the date object given the value of current day ( where current day == 1 means it's today)
export const getDateFromCurrentDay = currentDay => {
  return moment()
    .add(currentDay - 1, "days")
    .format(DATE_FORMAT);
};

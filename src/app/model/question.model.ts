import IOption from "./option.model";

export default interface IQuestion {
  questionText: string,
  explanation: string,
  options: IOption[],
}
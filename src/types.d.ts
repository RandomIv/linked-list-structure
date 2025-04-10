declare interface ILinkedList {
  length(): number;
  append(element: string): void;
  insert(element: string, index: number): void;
  delete(index: number): string;
  deleteAll(element: string): void;
  get(index: number): string;
  clone(): ILinkedList;
  reverse(): void;
  findFirst(element: string): number;
  findLast(element: string): number;
  clear(): void;
  extend(elements: ILinkedList): void;
}

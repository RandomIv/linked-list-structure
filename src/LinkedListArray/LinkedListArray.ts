export default class LinkedListArray implements ILinkedList {
  items: string[] = [];

  length(): number {
    return this.items.length;
  }

  append(element: string): void {
    this.items.push(element);
  }

  insert(element: string, index: number): void {
    if (index < 0 || index > this.items.length) {
      throw new Error('Invalid index');
    }
    this.items.splice(index, 0, element);
  }

  delete(index: number): string {
    if (index < 0 || index >= this.items.length) {
      throw new Error('Invalid index');
    }
    return this.items.splice(index, 1)[0];
  }

  deleteAll(element: string): void {
    this.items = this.items.filter((item) => item !== element);
  }

  get(index: number): string {
    if (index < 0 || index >= this.items.length) {
      throw new Error('Invalid index');
    }
    return this.items[index];
  }

  clone(): LinkedListArray {
    const newList = new LinkedListArray();
    newList.items = [...this.items];
    return newList;
  }

  reverse(): void {
    this.items.reverse();
  }

  findFirst(element: string): number {
    return this.items.indexOf(element);
  }

  findLast(element: string): number {
    return this.items.lastIndexOf(element);
  }

  clear(): void {
    this.items = [];
  }

  extend(elements: LinkedListArray): void {
    this.items.push(...elements.items);
  }
}

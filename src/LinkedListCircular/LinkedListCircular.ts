class ListNode {
  next: ListNode | null;
  constructor(public value: string) {
    this.value = value;
    this.next = null;
  }
}

export default class CircularSinglyLinkedList implements ILinkedList {
  head: ListNode | null = null;
  size: number = 0;

  length(): number {
    return this.size;
  }

  append(element: string): void {
    const newNode = new ListNode(element);
    if (!this.head) {
      this.head = newNode;
      this.head.next = this.head;
    } else {
      let temp: ListNode | null = this.head;
      while (temp!.next !== this.head) {
        temp = temp!.next;
      }
      temp!.next = newNode;
      newNode.next = this.head;
    }
    this.size++;
  }

  insert(element: string, index: number): void {
    if (index < 0 || index > this.size) {
      throw new Error('Invalid index');
    }
    const newNode = new ListNode(element);
    if (index === 0) {
      if (!this.head) {
        this.head = newNode;
        this.head.next = this.head;
      } else {
        let temp: ListNode | null = this.head;
        while (temp!.next !== this.head) {
          temp = temp!.next;
        }
        newNode.next = this.head;
        temp!.next = newNode;
        this.head = newNode;
      }
    } else {
      let prev = this.head;
      for (let i = 0; i < index - 1; i++) {
        prev = prev!.next;
      }
      newNode.next = prev!.next;
      prev!.next = newNode;
    }
    this.size++;
  }

  delete(index: number): string {
    if (index < 0 || index >= this.size || !this.head) {
      throw new Error('Invalid index');
    }
    let removedValue: string;
    if (index === 0) {
      removedValue = this.head.value;
      if (this.head.next === this.head) {
        this.head = null;
      } else {
        let temp: ListNode | null = this.head;
        while (temp!.next !== this.head) {
          temp = temp!.next;
        }
        temp!.next = this.head.next;
        this.head = this.head.next;
      }
    } else {
      let prev: ListNode | null = this.head;
      for (let i = 0; i < index - 1; i++) {
        prev = prev!.next;
      }
      removedValue = prev!.next!.value;
      prev!.next = prev!.next!.next;
    }
    this.size--;
    return removedValue;
  }

  deleteAll(element: string): void {
    if (!this.head) return;

    let index = 0;
    let temp: ListNode | null = this.head;
    let firstPass = true;

    do {
      if (!temp) break; // Guard against null temp

      if (temp.value === element) {
        this.delete(index);

        if (!this.head) break;

        temp = this.head;
        index = 0;
        firstPass = true;
      } else {
        temp = temp.next;
        index++;
        firstPass = false;
      }
    } while ((firstPass || temp !== this.head) && temp !== null);
  }
  get(index: number): string {
    if (index < 0 || index >= this.size || !this.head) {
      throw new Error('Invalid index');
    }
    let temp = this.head;
    for (let i = 0; i < index; i++) {
      temp = temp.next!;
    }
    return temp.value;
  }

  clone(): CircularSinglyLinkedList {
    const newList = new CircularSinglyLinkedList();
    let temp = this.head;
    if (temp) {
      do {
        newList.append(temp.value);
        temp = temp.next!;
      } while (temp !== this.head);
    }
    return newList;
  }

  reverse(): void {
    if (!this.head || this.size < 2) return;
    let prev: ListNode | null = null;
    let current = this.head;
    let next = null;
    do {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next!;
    } while (current !== this.head);
    this.head.next = prev;
    this.head = prev;
  }

  findFirst(element: string): number {
    let temp = this.head;
    let index = 0;
    if (!temp) return -1;
    do {
      if (temp.value === element) return index;
      temp = temp.next!;
      index++;
    } while (temp !== this.head);
    return -1;
  }

  findLast(element: string): number {
    let temp = this.head;
    let index = 0;
    let lastIndex = -1;
    if (!temp) return -1;
    do {
      if (temp.value === element) lastIndex = index;
      temp = temp.next!;
      index++;
    } while (temp !== this.head);
    return lastIndex;
  }

  clear(): void {
    this.head = null;
    this.size = 0;
  }

  extend(elements: CircularSinglyLinkedList): void {
    let temp = elements.head;
    if (temp) {
      do {
        this.append(temp.value);
        temp = temp.next!;
      } while (temp !== elements.head);
    }
  }
}

import CircularSinglyLinkedList from './LinkedListCircular';

describe('CircularSinglyLinkedList', () => {
  let list: CircularSinglyLinkedList;

  beforeEach(() => {
    list = new CircularSinglyLinkedList();
  });

  const checkCircularity = (list: CircularSinglyLinkedList) => {
    const head = list.head;
    const size = list.length();

    if (size === 0) {
      expect(head).toBeNull();
      return;
    }

    expect(head).not.toBeNull();
    let current = head;
    let count = 0;

    do {
      current = current!.next;
      count++;

      if (count > size) {
        throw new Error('Circularity broken: list is not properly circular');
      }
    } while (current !== head);

    expect(count).toBe(size);
  };

  afterEach(() => {
    checkCircularity(list);
  });

  describe('length', () => {
    it('returns 0 for empty list', () => {
      expect(list.length()).toBe(0);
    });

    it('returns correct length after appending', () => {
      list.append('a');
      list.append('b');
      expect(list.length()).toBe(2);
    });
  });

  describe('append', () => {
    it('adds to empty list', () => {
      list.append('a');
      expect(list.get(0)).toBe('a');
      expect(list.length()).toBe(1);
    });

    it('maintains circularity with multiple elements', () => {
      list.append('a');
      list.append('b');
      list.append('c');
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('b');
      expect(list.get(2)).toBe('c');
    });
  });

  describe('insert', () => {
    it('inserts at head of non-empty list', () => {
      list.append('b');
      list.insert('a', 0);
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('b');
    });

    it('inserts in the middle', () => {
      list.append('a');
      list.append('c');
      list.insert('b', 1);
      expect(list.get(1)).toBe('b');
    });

    it('inserts at the end', () => {
      list.append('a');
      list.insert('b', 1);
      expect(list.get(1)).toBe('b');
    });

    it('throws error for invalid index', () => {
      expect(() => list.insert('a', -1)).toThrow();
      expect(() => list.insert('a', 1)).toThrow();
    });
  });

  describe('delete', () => {
    it('deletes the only element', () => {
      list.append('a');
      expect(list.delete(0)).toBe('a');
      expect(list.length()).toBe(0);
    });

    it('deletes head with multiple elements', () => {
      list.append('a');
      list.append('b');
      list.append('c');
      expect(list.delete(0)).toBe('a');
      expect(list.get(0)).toBe('b');
    });

    it('deletes from the middle', () => {
      list.append('a');
      list.append('b');
      list.append('c');
      expect(list.delete(1)).toBe('b');
      expect(list.get(1)).toBe('c');
    });

    it('throws error for invalid index', () => {
      expect(() => list.delete(0)).toThrow();
      list.append('a');
      expect(() => list.delete(1)).toThrow();
    });
  });

  describe('deleteAll', () => {
    it('removes all instances of element', () => {
      list.append('a');
      list.append('a');
      list.append('b');
      list.deleteAll('a');
      expect(list.length()).toBe(1);
      expect(list.get(0)).toBe('b');
    });

    it('handles consecutive deletions', () => {
      list.append('a');
      list.append('a');
      list.append('a');
      list.deleteAll('a');
      expect(list.length()).toBe(0);
    });
  });

  describe('get', () => {
    it('returns element at given index', () => {
      list.append('a');
      list.append('b');
      expect(list.get(1)).toBe('b');
    });

    it('throws error for invalid index', () => {
      expect(() => list.get(0)).toThrow();
      list.append('a');
      expect(() => list.get(1)).toThrow();
    });
  });

  describe('clone', () => {
    it('creates an independent copy', () => {
      list.append('a');
      const clone = list.clone();
      clone.append('b');
      expect(list.length()).toBe(1);
      expect(clone.length()).toBe(2);
    });
  });

  describe('reverse', () => {
    it('reverses the list', () => {
      list.append('a');
      list.append('b');
      list.append('c');
      list.reverse();
      expect(list.get(0)).toBe('c');
      expect(list.get(1)).toBe('b');
      expect(list.get(2)).toBe('a');
    });

    it('maintains circularity after reverse', () => {
      list.append('a');
      list.append('b');
      list.reverse();
      list.append('c');
      expect(list.get(2)).toBe('c');
    });
  });

  describe('findFirst', () => {
    it('finds first occurrence', () => {
      list.append('b');
      list.append('a');
      list.append('a');
      expect(list.findFirst('a')).toBe(1);
    });

    it('returns -1 if not found', () => {
      expect(list.findFirst('a')).toBe(-1);
    });
  });

  describe('findLast', () => {
    it('finds last occurrence', () => {
      list.append('a');
      list.append('b');
      list.append('a');
      expect(list.findLast('a')).toBe(2);
    });

    it('returns -1 if not found', () => {
      expect(list.findLast('a')).toBe(-1);
    });
  });

  describe('clear', () => {
    it('empties the list', () => {
      list.append('a');
      list.clear();
      expect(list.length()).toBe(0);
    });
  });

  describe('extend', () => {
    it('appends elements from another list', () => {
      const otherList = new CircularSinglyLinkedList();
      otherList.append('b');
      otherList.append('c');
      list.append('a');
      list.extend(otherList);
      expect(list.length()).toBe(3);
      expect(list.get(2)).toBe('c');
    });
  });
});

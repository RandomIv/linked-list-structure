import LinkedListArray from './LinkedListArray';

describe('LinkedListArray', () => {
  let list: LinkedListArray;

  beforeEach(() => {
    list = new LinkedListArray();
  });

  describe('length', () => {
    it('returns 0 for empty list', () => {
      expect(list.length()).toBe(0);
    });

    it('returns correct length after appending elements', () => {
      list.append('a');
      list.append('b');
      expect(list.length()).toBe(2);
    });
  });

  describe('append', () => {
    it('adds elements to the end of the list', () => {
      list.append('a');
      list.append('b');
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('b');
    });
  });

  describe('insert', () => {
    it('inserts element at the beginning', () => {
      list.insert('a', 0);
      expect(list.get(0)).toBe('a');
      list.insert('b', 0);
      expect(list.get(0)).toBe('b');
    });

    it('inserts element in the middle', () => {
      list.append('a');
      list.append('c');
      list.insert('b', 1);
      expect(list.get(1)).toBe('b');
    });

    it('inserts element at the end', () => {
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

    it('deletes element from the middle', () => {
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
    it('removes all occurrences of an element', () => {
      list.append('a');
      list.append('b');
      list.append('a');
      list.deleteAll('a');
      expect(list.length()).toBe(1);
      expect(list.get(0)).toBe('b');
    });

    it('does nothing if element not found', () => {
      list.append('a');
      list.deleteAll('b');
      expect(list.length()).toBe(1);
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
    it('creates a deep copy', () => {
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
  });

  describe('findFirst', () => {
    it('returns first index of element', () => {
      list.append('a');
      list.append('b');
      list.append('a');
      expect(list.findFirst('a')).toBe(0);
    });

    it('returns -1 if element not found', () => {
      expect(list.findFirst('a')).toBe(-1);
    });
  });

  describe('findLast', () => {
    it('returns last index of element', () => {
      list.append('a');
      list.append('b');
      list.append('a');
      expect(list.findLast('a')).toBe(2);
    });

    it('returns -1 if element not found', () => {
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
    it('adds all elements from another list', () => {
      const otherList = new LinkedListArray();
      otherList.append('b');
      otherList.append('c');
      list.append('a');
      list.extend(otherList);
      expect(list.length()).toBe(3);
      expect(list.get(2)).toBe('c');
    });
  });
});

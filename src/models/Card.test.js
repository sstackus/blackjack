import Card from './Card';

describe('Card', () => {
  describe('Enums', () => {
    test('Has suits', () => {
      expect(Card.Suits).toBeInstanceOf(Array);
      expect(Card.Suits.length).toBeGreaterThan(1);
    });
    test('Suits is a flat array', () => {
      expect(Card.Suits.every(suit => typeof suit === 'string')).toBe(true);
    });
    test('Has ranks', () => {
      expect(Card.Ranks).toBeInstanceOf(Array);
      expect(Card.Ranks.length).toBeGreaterThan(1);
    });
    test('Ranks is key-value pairs', () => {
      for (let i = 0; i < Card.Ranks.length; i++) {
        expect(Card.Ranks[i]).toMatchObject([
          expect.any(String),
          expect.any(Number),
        ]);
      }
    });
    test('Suits is immutable', () => {
      expect(Object.isFrozen(Card.Suits)).toBe(true);
    });
    test('Ranks is immutable', () => {
      expect(Object.isFrozen(Card.Ranks)).toBe(true);
    });
  });

  describe('Constructor', () => {
    test('Throws error for invalid, non-enum arguments', () => {
      expect(() => new Card()).toThrow(TypeError);
      expect(() => new Card('clubs', ['two', 2])).toThrow(TypeError);
      expect(() => new Card(undefined, Card.Ranks[0])).toThrow(TypeError);
    });

    describe('Initial properties', () => {
      const suit = Card.Suits[0];
      const rank = Card.Ranks[0];
      const card = new Card(suit, rank);

      test('Suit and rank as instance properties', () => {
        expect(card.suit).toBe(suit);
        expect(card.rank).toBe(rank);
      });

      test('Suit and rank "private"', () => {
        const keys = Object.keys(card);
        expect(keys).not.toContain('suit');
        expect(keys).not.toContain('rank');
      });

      test('Prevents mutations', () => {
        expect(() => card.suit = suit).toThrow();
        expect(() => card.rank = rank).toThrow();
      });
    });
  });

  describe('Methods', () => {
    const suit = Card.Suits[0];
    const rank = Card.Ranks[0];
    const card = new Card(suit, rank);

    test('Get rank name', () => {
      expect(card.getRankName()).toBe(rank[0]);
    });

    test('Get value', () => {
      expect(card.getValue()).toBe(rank[1]);
    });

    test('Get suit', () => {
      expect(card.getSuit()).toBe(suit);
    });

    test('Implements toString', () => {
      const cast = `${card}`;
      expect(cast).toContain(suit);
      expect(cast).toContain(rank[0]);
    });

    describe('Ace', () => {
      const ace = new Card(suit, Card.Ranks.find(r => r[0] === 'ace'));

      test('Determines if ace', () => {
        expect(card.isAce()).toBe(false);
        expect(ace.isAce()).toBe(true);
      });

      test('Recognizes non-ace', () => {
        expect(card.isUnswitchedAce()).toBe(false);
        card.switchAce();
        expect(card.isUnswitchedAce()).toBe(false);
      });

      test('Allows ace to switch value', () => {
        expect(ace.isUnswitchedAce()).toBe(true);
        ace.switchAce();
        expect(ace.isUnswitchedAce()).toBe(false);
        expect(ace.getValue()).toBe(1);
      });
    });
  });
});

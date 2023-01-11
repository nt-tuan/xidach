import React from "react";
export const DeckContext = React.createContext();

export const suits = ["♥", "♦", "♣", "♠"];
export const symbols = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const getFullCards = () => {
  const cards = [];
  for (const suit of suits) {
    for (const symbol of symbols) {
      cards.push({
        suit,
        symbol,
      });
    }
  }
  return cards;
};

const isCardEqual = (cardA, cardB) =>
  cardA.suit === cardB.suit && cardA.symbol === cardB.symbol;

const toPickedCard = (card) => {
  return { ...card, handed: !Boolean(card.handed) };
};

const toRevealedCard = (card) => {
  return { ...card, revealed: !Boolean(card.revealed) };
};

export const DeckContextProvider = ({ children }) => {
  const [cards, setCards] = React.useState(getFullCards());
  const hands = cards.filter((card) => card.handed);
  const avaiableCards = cards.filter((card) => !card.handed && !card.revealed);

  const updateCard = (pickedCard, action) => {
    setCards((cards) =>
      cards.map((card) => {
        console.log(
          card,
          pickedCard,
          isCardEqual(pickedCard, card),
          action(card)
        );
        return isCardEqual(pickedCard, card) ? action(card) : card;
      })
    );
  };

  const pickCard = (card) => {
    updateCard(card, toPickedCard);
  };

  const revealCard = (card) => {
    updateCard(card, toRevealedCard);
  };

  return (
    <DeckContext.Provider
      value={{ cards, hands, setCards, pickCard, revealCard, avaiableCards }}
    >
      {children}
    </DeckContext.Provider>
  );
};

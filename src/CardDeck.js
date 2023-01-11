import { Box, Stack } from "@mui/material";
import React from "react";
import { Card } from "./Card";
import { DeckContext, suits } from "./DeckProvider";

export const CardDeck = ({ pickingMode }) => {
  const { cards, pickCard, revealCard } = React.useContext(DeckContext);
  const groups = React.useMemo(() => {
    const map = new Map();
    for (const suit of suits) {
      map.set(suit, []);
    }
    for (const card of cards) {
      map.get(card.suit).push(card);
    }
    return Array.from(map.values());
  }, [cards]);

  const handleClick = (card) => {
    console.log(card);
    if (pickingMode === "YOU") {
      pickCard(card);
      return;
    }
    if (pickingMode === "OTHER") revealCard(card);
  };

  return (
    <Stack spacing={1} height="100%">
      {groups.map((group, index) => (
        <Stack
          flexGrow={1}
          height={0}
          key={index}
          direction="row"
          flexWrap="no-wrap"
        >
          {group.map((item) => (
            <Card card={item} onClick={handleClick} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

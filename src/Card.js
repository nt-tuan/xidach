import { Box } from "@mui/material";

const suitMap = {
  "♥": "hearts",
  "♦": "diamonds",
  "♣": "clubs",
  "♠": "spades",
};

const getSrc = (card) => {
  return `/cards/${card.symbol.toLowerCase()}_of_${suitMap[card.suit]}.svg`;
};
export const Card = ({ card, onClick }) => {
  const isDisabled = card.handed || card.revealed;

  return (
    <Box
      width="100%"
      height="100%"
      position="relative"
      onClick={() => {
        onClick(card);
      }}
    >
      <img
        width="100%"
        height="100%"
        src={getSrc(card)}
        alt="card"
        style={{
          opacity: isDisabled ? 0.5 : 1,
          objectFit: "cover",
          objectPosition: "left center",
        }}
      />
      {card.handed && (
        <Box
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          sx={{ backgroundColor: "green", opacity: 0.4, borderRadius: 1 }}
        ></Box>
      )}
      {card.revealed && (
        <Box
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          sx={{ backgroundColor: "red", opacity: 0.4, borderRadius: 1 }}
        ></Box>
      )}
    </Box>
  );
};

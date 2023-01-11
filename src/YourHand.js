import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import { Card } from "./Card";
import { DeckContext } from "./DeckProvider";
import { WinRate } from "./WinRate";

export const YourHand = () => {
  const { cards, pickCard } = React.useContext(DeckContext);
  const hands = cards.filter((card) => card.handed);
  console.log(hands);
  return (
    <Grid container height="100%" columnSpacing={2}>
      <Grid item xs={6} sx={{ height: "100%" }}>
        <Box height="100%" borderRadius={2} sx={{ backgroundColor: "#d3d3d3" }}>
          <Stack direction="row" height="100%">
            {hands.map((card, index) => (
              <Box height="100%">
                <Card card={card} onClick={pickCard} />
              </Box>
            ))}
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={6} height="100%">
        <Stack width="100%" height="100%">
          <Box height={0} flexGrow={1} width="100%">
            <WinRate />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

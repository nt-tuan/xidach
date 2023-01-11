import React from "react";
import { Stack, Box, Button, Grid } from "@mui/material";
import "./App.css";
import { CardDeck } from "./CardDeck";
import { DeckContextProvider } from "./DeckProvider";
import { YourHand } from "./YourHand";

function App() {
  const [pickingMode, setPickingMode] = React.useState("YOU");

  return (
    <DeckContextProvider>
      <Box sx={{ height: "100%" }}>
        <Stack height="100%" spacing={2} px={2}>
          <Box height={200} pt={4}>
            <YourHand />
          </Box>
          <Box height={0} flexGrow={1}>
            <CardDeck pickingMode={pickingMode} />
          </Box>
          <Box p={2}>
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  onClick={() => setPickingMode("YOU")}
                  variant={pickingMode === "YOU" ? "contained" : "outlined"}
                >
                  Bạn
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  onClick={() => setPickingMode("OTHER")}
                  variant={pickingMode === "OTHER" ? "contained" : "outlined"}
                >
                  Khác
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </DeckContextProvider>
  );
}

export default App;

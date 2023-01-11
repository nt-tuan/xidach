import { Box, SliderTrack, Stack, Typography } from "@mui/material";
import React from "react";
import { DeckContext } from "./DeckProvider";

const symbolWeight = {
  2: [2],
  3: [3],
  4: [4],
  5: [5],
  6: [6],
  7: [7],
  8: [8],
  9: [9],
  10: [10],
  J: [10],
  Q: [10],
  K: [10],
  A: [1, 10, 11],
};

const sumCards = (cards) => {
  const sums = [];
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const currentSums = sums[i - 1] ?? [0];
    console.log("sums", sums);
    const cardWeights = symbolWeight[card.symbol];
    const nextSums = [];
    for (const weight of cardWeights) {
      for (const sum of currentSums) {
        nextSums.push(sum + weight);
      }
    }
    sums.push(nextSums);
  }
  const firstSum = sums[sums.length - 1].sort((a, b) => {
    if (a > 21) return 1;
    if (a < 16) return 1;
    if (b > 21) return -1;
    if (b < 16) return -1;
    return b - a;
  });

  return firstSum[0];
};

export const WinRate = () => {
  const { cards, hands, avaiableCards } = React.useContext(DeckContext);
  const hostDistribution = React.useMemo(() => {
    const d = new Map();
    for (let i = 0; i < avaiableCards.length; i++) {
      for (let j = i + 1; j < avaiableCards.length; j++) {
        const card1 = avaiableCards[i];
        const card2 = avaiableCards[j];
        const weight = sumCards([card1, card2]);
        if (!d.has(weight)) {
          d.set(weight, 0);
        }

        d.set(weight, d.get(weight) + 1);
      }
    }

    const entries = Array.from(d.entries());
    return entries;
  }, [avaiableCards]);

  const { win, lose, draw, undetermine } = React.useMemo(() => {
    if (hands.length < 2 || hands.length > 5) {
      return {};
    }
    const myWeight = sumCards(hands);
    const total = hostDistribution.reduce((r, [, count]) => r + count, 0);
    console.log(total, myWeight, hostDistribution);
    const less15Count = hostDistribution
      .filter(([key]) => key < 15)
      .reduce((r, [, count]) => r + count, 0);

    const winCount = hostDistribution
      .filter(([key, value]) => key >= 15 && key < myWeight)
      .reduce((r, [, count]) => r + count, 0);

    const drawCount = hostDistribution
      .filter(([key, value]) => key >= 15 && key === myWeight)
      .reduce((r, [, count]) => r + count, 0);

    const loseCount = hostDistribution
      .filter(([key, value]) => key >= 15 && key > myWeight)
      .reduce((r, [, count]) => r + count, 0);

    return {
      win: (winCount * 100) / total,
      lose: (loseCount * 100) / total,
      draw: (drawCount * 100) / total,
      undetermine: (less15Count * 100) / total,
    };
  }, [hands, hostDistribution]);

  return (
    <Stack height="100%" justifyContent="center">
      <Typography fontSize={14} fontWeight={700}>
        Win Rate: {win?.toFixed(0)}%
      </Typography>

      <Typography fontSize={14} fontWeight={700}>
        Lose Rate: {lose?.toFixed(0)}%
      </Typography>

      <Typography fontSize={14} fontWeight={700}>
        Draw Rate: {draw?.toFixed(0)}%
      </Typography>

      <Typography fontSize={14} fontWeight={700}>
        Undetermined: {undetermine?.toFixed(0)}%
      </Typography>
    </Stack>
  );
};

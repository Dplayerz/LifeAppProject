import { AnimatePresence, MotiView } from "moti";
import React from "react";
import { Text } from "react-native";

type XPRewardProps = {
  show: boolean;
  amount?: number;
};

const XPReward: React.FC<XPRewardProps> = ({ show, amount = 10 }) => {
  return (
    <AnimatePresence>
      {show && (
        <MotiView
          from={{ scale: 0, opacity: 0, translateY: 20 }}
          animate={{ scale: 1.2, opacity: 1, translateY: -40 }}
          exit={{ opacity: 0, translateY: -80 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 300,
          }}
          style={{
            position: "absolute",
            alignSelf: "center",
            backgroundColor: "#FFD700",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 30,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#222" }}>
            +{amount} XP
          </Text>
        </MotiView>
      )}
    </AnimatePresence>
  );
};

export default XPReward;

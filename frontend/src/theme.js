// theme.js
import { extendTheme } from "@chakra-ui/react";

const customInputStyle = {
  baseStyle: {
    _focus: {
      backgroundColor: '#FFF',
      borderColor: "#FF176B",
      boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.6)",
    },
  },
};

const theme = extendTheme({
  components: {
    Input: customInputStyle,
  },
});

export default theme;

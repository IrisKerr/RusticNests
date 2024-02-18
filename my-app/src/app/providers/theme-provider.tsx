import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConfigProvider
        theme={{
          token: { colorPrimary: "#9D957F", borderRadius: 2 },
          components: {
            Button: {
              controlHeight: 40,
              boxShadow: "none",
              colorPrimaryActive: "#9D957F",
              controlOutline: "none",
              colorBorder: "#9D957F",
            },
            Input: {
              controlHeight: 42,
              boxShadow: "none",
              activeShadow: "none",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </>
  );
}

export default ThemeProvider;

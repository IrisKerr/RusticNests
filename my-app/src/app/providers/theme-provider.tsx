import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConfigProvider
        theme={{
          token: { colorPrimary: "#77ba9b", borderRadius: 2 },
          components: {
            Button: {
              controlHeight: 40,
              boxShadow: "none",
              colorPrimaryActive: "#EEB397",
              controlOutline: "none",
              colorBorder: "#77ba9b",
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

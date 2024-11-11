import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubscriptionSuccess } from "./components/SubscriptionSuccess";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  const { network } = useTonConnect();

  return (
    <BrowserRouter>
      <AuthProvider>
        <StyledApp>
          <AppContainer>
            <FlexBoxCol>
              <FlexBoxRow>
                <TonConnectButton />
                <Button>
                  {network
                    ? network === CHAIN.MAINNET
                      ? "mainnet"
                      : "testnet"
                    : "N/A"}
                </Button>
              </FlexBoxRow>
              
              <Routes>
                <Route path="/" element={
                  <>
                    {/* Public section */}
                    <Counter />
                    
                    {/* Protected sections */}
                    <ProtectedRoute>
                      <TonConnectButton />
                      <FlexBoxCol>
                        <TransferTon />
                        <Jetton />
                      </FlexBoxCol>
                    </ProtectedRoute>
                  </>
                } />
                <Route 
                  path="/subscription-success" 
                  element={
                    <ProtectedRoute>
                      <SubscriptionSuccess />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </FlexBoxCol>
          </AppContainer>
        </StyledApp>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
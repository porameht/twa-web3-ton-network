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
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { SubscriptionSuccess } from "./components/SubscriptionSuccess";
import { CredentialsForm } from './components/CredentialsForm';

// Styled components
const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;
  min-height: 100vh;
  padding: 20px;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  a {
    text-decoration: none;
    color: var(--tg-theme-button-color);
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(46, 173, 220, 0.1);
    }
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.2);
  }
`;

// Route components
const HomeRoute = ({ network }: { network: CHAIN | null }) => (
  <>
    <Counter />
    <ProtectedRoute>
      <TonConnectButton />
      <FlexBoxCol>
        <TransferTon />
        <Jetton />
      </FlexBoxCol>
    </ProtectedRoute>
  </>
);

const CredentialsRoute = ({ onSubmit }: { onSubmit: (credentials: any) => void }) => (
  <ProtectedRoute>
    <CredentialsForm onSubmit={onSubmit} />
  </ProtectedRoute>
);

const SubscriptionRoute = () => (
  <ProtectedRoute>
    <SubscriptionSuccess />
  </ProtectedRoute>
);

function App() {
  const { network } = useTonConnect();

  const handleCredentialsSubmit = (credentials: {
    facebookEmail: string;
    facebookPassword: string;
    telegramBotToken: string;
  }) => {
    console.log('Credentials submitted:', credentials);
  };

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
              <NavBar>
                <Link to="/">Home</Link>
                <Link to="/credentials">Credentials</Link>

              </NavBar>

              <Routes>
                <Route path="/" element={<HomeRoute network={network} />} />
                <Route path="/subscription-success" element={<SubscriptionRoute />} />
                <Route path="/credentials" element={<CredentialsRoute onSubmit={handleCredentialsSubmit} />} />
              </Routes>
            </FlexBoxCol>
          </AppContainer>
        </StyledApp>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

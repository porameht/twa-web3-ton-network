import { Card, FlexBoxCol, Button } from "./styled/styled";
import { useNavigate } from "react-router-dom";

export function SubscriptionSuccess() {
  const navigate = useNavigate();

  return (
    <Card>
      <FlexBoxCol>
        <h2>Subscription Successful!</h2>
        <p>Thank you for subscribing to our premium package.</p>
        <p>Your payment has been verified and your subscription is now active.</p>
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </FlexBoxCol>
    </Card>
  );
} 
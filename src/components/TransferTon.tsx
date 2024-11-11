import { useState } from "react";
import styled from "styled-components";
import { Address, toNano, beginCell } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";

export function TransferTon() {
  const { sender, connected } = useTonConnect();
  const subscriptionAddress = "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c";
  const monthlyFee = "30"; // 10 TON monthly subscription fee
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const handleSubscribe = async () => {
    const result = await sender.send({
      to: Address.parse(subscriptionAddress),
      value: toNano(monthlyFee),
    });

    console.log(result);
  };

  return (
    <Card>
      <FlexBoxCol>
        <h3>Subscribe with TON</h3>
        <FlexBoxRow>
          <label>Monthly Subscription Fee: {monthlyFee} TON</label>
        </FlexBoxRow>
        <FlexBoxRow>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Subscribe to our premium features by paying {monthlyFee} TON monthly.
            Your subscription will be automatically renewed every month.
          </p>
        </FlexBoxRow>
        <Button
          disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={handleSubscribe}
        >
          Subscribe Now
        </Button>
        {/* {transactionId && (
          <p style={{ marginTop: 8, fontSize: "14px" }}>
            Transaction ID: {transactionId}
          </p>
        )} */}
      </FlexBoxCol>
    </Card>
  );
}

import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { SuccessIcon, ErrorIcon, InfoIcon } from '../../util/CustomIcons';
import './OrderResult.css';

const STATUS_CONTENT_MAP = {
  succeeded: { text: "Payment succeeded", iconColor: "#30B130", icon: SuccessIcon, },
  processing: { text: "Your payment is processing.", iconColor: "#6D6E78", icon: InfoIcon, },
  requires_payment_method: { text: "Your payment was not successful, please try again.", iconColor: "#DF1B41", icon: ErrorIcon, },
  default: { text: "Something went wrong, please try again.", iconColor: "#DF1B41", icon: ErrorIcon, }
};

export default function OrderResult() {
  const stripe = useStripe();

  const [status, setStatus] = useState("default");
  const [intentId, setIntentId] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
      if (!paymentIntent) {
        return;
      }

      setStatus(paymentIntent.status);
      setIntentId(paymentIntent.id);
    });
  }, [stripe]);

  return (
    <div id="payment-status">
      <div id="status-icon" style={{backgroundColor: STATUS_CONTENT_MAP[status].iconColor}}>
        {STATUS_CONTENT_MAP[status].icon}
      </div>
      <Typography variant='h4' id="status-text">{STATUS_CONTENT_MAP[status].text}</Typography>
      {intentId && <div id="details-table">
        <Typography variant='h6' color='warning.main'>
          Remember: this is a test!
        </Typography>
        <Typography variant='body1' color='warning.main' gutterBottom>
          (No card actually charged)
        </Typography>
        <table>
          <tbody>
            <tr>
              <td style={{fontWeight: 'bold'}}>Transaction details:</td>
            </tr>
            <tr>
              <td className="TableLabel">id:</td>
              <td id="intent-id" className="TableContent">{intentId}</td>
            </tr>
            <tr>
              <td className="TableLabel">status:</td>
              <td id="intent-status" className="TableContent">{status}</td>
            </tr>
          </tbody>
        </table>
      </div>}
      {intentId && <a href={`https://dashboard.stripe.com/payments/${intentId}`} id="view-details" rel="noopener noreferrer" target="_blank">View details
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{paddingLeft: '5px'}}>
          <path fillRule="evenodd" clipRule="evenodd" d="M3.125 3.49998C2.64175 3.49998 2.25 3.89173 2.25 4.37498V11.375C2.25 11.8582 2.64175 12.25 3.125 12.25H10.125C10.6082 12.25 11 11.8582 11 11.375V9.62498C11 9.14173 11.3918 8.74998 11.875 8.74998C12.3582 8.74998 12.75 9.14173 12.75 9.62498V11.375C12.75 12.8247 11.5747 14 10.125 14H3.125C1.67525 14 0.5 12.8247 0.5 11.375V4.37498C0.5 2.92524 1.67525 1.74998 3.125 1.74998H4.875C5.35825 1.74998 5.75 2.14173 5.75 2.62498C5.75 3.10823 5.35825 3.49998 4.875 3.49998H3.125Z" fill="#0055DE"/>
          <path d="M8.66672 0C8.18347 0 7.79172 0.391751 7.79172 0.875C7.79172 1.35825 8.18347 1.75 8.66672 1.75H11.5126L4.83967 8.42295C4.49796 8.76466 4.49796 9.31868 4.83967 9.66039C5.18138 10.0021 5.7354 10.0021 6.07711 9.66039L12.7501 2.98744V5.83333C12.7501 6.31658 13.1418 6.70833 13.6251 6.70833C14.1083 6.70833 14.5001 6.31658 14.5001 5.83333V0.875C14.5001 0.391751 14.1083 0 13.6251 0H8.66672Z" fill="#0055DE"/>
          </svg>
      </a>}
      <Button variant='contained' sx={{ minWidth: '100%' }} href='/'>
        Back to shop
      </Button>
    </div>
  );
}
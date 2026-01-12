import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock, Loader2 } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onBack: () => void;
}

export function PaymentForm({ amount, onSuccess, onBack }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      setError("Please enter a valid 16-digit card number");
      return;
    }
    if (expiry.length !== 5) {
      setError("Please enter a valid expiry date (MM/YY)");
      return;
    }
    if (cvv.length < 3) {
      setError("Please enter a valid CVV");
      return;
    }
    if (!name.trim()) {
      setError("Please enter the cardholder name");
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setProcessing(false);
    onSuccess();
  };

  return (
    <div className="cinema-card p-6 max-w-md mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-xl">Payment Details</h3>
          <p className="text-sm text-muted-foreground">Secure payment processing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Card Number</label>
          <Input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
            className="bg-secondary/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Cardholder Name</label>
          <Input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-secondary/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Expiry Date</label>
            <Input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              maxLength={5}
              className="bg-secondary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CVV</label>
            <Input
              type="password"
              placeholder="•••"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
              maxLength={4}
              className="bg-secondary/50"
            />
          </div>
        </div>

        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}

        <div className="border-t border-border pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground">Total Amount</span>
            <span className="font-display text-2xl text-primary">${amount}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={onBack} className="flex-1" disabled={processing}>
            Back
          </Button>
          <Button type="submit" className="flex-1 cinema-button" disabled={processing}>
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Pay ${amount}
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Your payment information is secure
        </p>
      </form>
    </div>
  );
}

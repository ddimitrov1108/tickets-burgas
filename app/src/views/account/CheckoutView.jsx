import { Navigate, useLocation } from "react-router-dom";
import CheckoutForm from "../../components/forms/CheckoutForm";
import { Card } from "../../components/ui";

export default function CheckoutView() {
  const location = useLocation();
  const selectedTicket = location.state?.ticket;

  return !selectedTicket ? (
    <Navigate to="/404" replace />
  ) : (
    <div className="lg:py-8 grid grid-cols-5 gap-12">
      <div className="col-span-5 order-2 lg:order-1 lg:col-span-3">
        <CheckoutForm checkoutId={selectedTicket.id} />
      </div>

      <Card
        className="h-fit relative p-0 order-1 col-span-5 lg:col-span-2"
        elevated
      >
        <div className="p-4 border-b border-secondary-light/60 font-semibold">
          Информация за поръчката
        </div>
        <div className="overflow-auto min-h-[250px] max-h-[320px]">
          <div className="flex justify-between p-4">
            <div className="text-primary-main">
              <span className="font-semibold text-black">1 x </span> Пътнически
              билет
              <span className="font-semibold">{` ${selectedTicket.travelTime} мин.`}</span>
            </div>
            <div className="font-semibold">
              {selectedTicket.cost.toFixed(2)} лв.
            </div>
          </div>
        </div>

        <div className="w-full p-4 flex justify-between items-center border-t border-secondary-light/60 bg-secondary-light/20">
          Обща стойност:
          <div className="font-bold text-xl">
            {selectedTicket.cost.toFixed(2)} лв.
          </div>
        </div>
      </Card>
    </div>
  );
}

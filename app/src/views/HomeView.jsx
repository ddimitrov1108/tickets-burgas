import TicketCard from "../components/TicketCard";

const tickets = [
  {
    id: 1,
    travelTime: 60,
    cost: 1.5,
  },
  {
    id: 2,
    travelTime: 90,
    cost: 2,
  },
  {
    id: 3,
    travelTime: 120,
    cost: 2.5,
  },
];

export default function HomeView() {
  return (
    <>
      <div className="hidden mt-12 font-semibold text-center lg:block">
        <p className="text-2xl">Закупуване на пътнически билет</p>
        <p className="py-8 text-sm max-w-[600px] w-full mx-auto">
          Нашите услуги са достъпни за Вас благодарение на{" "}
          <a
            href="https://burgasbus.info/burgasbus/?cat=1"
            target="_blank"
            className="text-primary-main"
          >
            “Бургасбус” ЕООД
          </a>
          {". "} <br />
          При изискване на билет от кондуктор Вие трябва да предоставите валиден
          такъв.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 lg:my-2 lg:pb-10">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

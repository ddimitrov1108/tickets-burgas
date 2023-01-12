import { useState, useEffect, useRef } from "react";
import ActiveTicketsCardSkeleton from "../../components/skeletons/ActiveTicketsCardSkeleton";
import TicketsTableSkeleton from "../../components/skeletons/TicketsTableSkeleton";
import ActiveTicketCard from "../../components/ActiveTicketCard";
import TicketsTable from "../../components/TicketsTable";
import Cookies from "js-cookie";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { Button, Card, Container } from "../../components/ui";

export default function MyTicketsView() {
  const { data, isLoading, isFetching } = useQuery(
    ["tickets"],
    async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tickets/fetch`,
        {
          headers: {
            authorization: `bearer ${Cookies.get("jwt")}`,
          },
        }
      );

      return response.data;
    },
    {
      onError: (error) => {
        console.log(error);
        toast.error(error.response ? error.response.data : error.message);
      },
    }
  );

  return isLoading || isFetching ? (
    <>
      <ActiveTicketsCardSkeleton />
      <TicketsTableSkeleton />
    </>
  ) : (
    <>
      <div className="w-full relative">
        {data.activeTickets && data.activeTickets.length > 0 ? (
          <Swiper
            spaceBetween={30}
            pagination={{
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            style={{
              "--swiper-navigation-color": "#0D72FF",
              "--swiper-navigation-size": "18px",
            }}
          >
            {activeTickets.map((ticket) => (
              <SwiperSlide key={ticket.barCode}>
                <ActiveTicketCard ticket={ticket} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Card className="md:p-8 min-h-[300px] flex flex-col text-center justify-center text-secondary-dark">
            <span>
              Нямате активен билет.
              <br />
              Може да си закупите такъв от{" "}
            </span>
            <NavLink to="/" replace>
              <Button
                variant="text"
                className="mt-2 md:mx-auto md:max-w-fit"
                fullWidth
              >
                Закупуване на Билет
              </Button>
            </NavLink>
          </Card>
        )}
      </div>

      {data.tickets && data.tickets.length > 0 ? (
        <TicketsTable tickets={data.tickets} />
      ) : (
        <Container className="py-24 flex flex-col text-center justify-center text-secondary-dark">
          <span>Нямате направени покупки</span>
        </Container>
      )}
    </>
  );
}

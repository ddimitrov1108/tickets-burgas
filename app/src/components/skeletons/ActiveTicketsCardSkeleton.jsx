import { Card, Skeleton } from "../ui";
import { FaQrcode } from "react-icons/fa";

export default function ActiveTicketsCardSkeleton() {
  return (
    <Card className="md:p-8">
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        <div>
          <div>
            <Skeleton className="h-8 w-52" />
          </div>
          <div className="flex flex-col gap-11 mt-5">
            {[...Array(3).keys()].map((key) => (
              <div key={key}>
                <Skeleton className="mb-2 h-2 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <FaQrcode className="text-secondary-light/50 h-44 w-44" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </Card>
  );
}

import { Container, Skeleton } from "../ui";

export default function TicketsTableSkeleton() {
  return (
    <Container className="mt-4 p-0 w-full text-left overflow-x">
      <Skeleton className="mb-2 h-4 w-44" />
      <div className="mt-6 overflow-x-auto">
        <table className="table-fixed overflow-scroll min-w-full">
          <thead>
            <tr className="text-sm text-secondary-dark py-10">
              <th className="py-2 font-normal">
                <Skeleton className="mb-2 h-2 w-32" />
              </th>
              <th className="py-2 font-normal text-center">
                <Skeleton className="mx-auto mb-2 h-2 w-20" />
              </th>
              <th className="py-2 font-normal text-center">
                <Skeleton className="mx-auto mb-2 h-2 w-24" />
              </th>
              <th className="py-2 font-normal text-center">
                <Skeleton className="mx-auto mb-2 h-2 w-28" />
              </th>
            </tr>
          </thead>
          <tbody className="min-w-3xl">
            {[...Array(3).keys()].map((key) => (
              <tr key={key}>
                <td className="py-6 text-primary-main font-semibold">
                  <Skeleton className="h-4 w-52" />
                </td>
                <td className="text-center text-xl">
                  <Skeleton rounded='full' className="mx-auto h-6 w-6" />
                </td>
                <td className="text-center text-sm">
                  <Skeleton className="mx-auto mb-2 h-2 w-16" />
                </td>
                <td className="text-center text-sm max-w-fit">
                  <Skeleton className="mx-auto mb-2 h-2 w-16" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

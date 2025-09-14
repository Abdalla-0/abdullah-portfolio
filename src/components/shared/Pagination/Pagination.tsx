import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
type Props = {
  pagesCount: number[];
  pageNumber: number;
  route: string;
};
const PaginationComponent = ({ pagesCount, pageNumber, route }: Props) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Link
            href={pageNumber > 1 ? `${route}?pageNumber=${pageNumber - 1}` : ""}
          >
            <PaginationPrevious
              aria-disabled={pageNumber === 1}
              className={
                pageNumber === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </Link>
        </PaginationItem>
        {pagesCount.map((page) => (
          <PaginationItem key={page}>
            <Link href={`${route}?pageNumber=${page}`}>
              <PaginationLink isActive={page === pageNumber}>
                {page}
              </PaginationLink>
            </Link>
          </PaginationItem>
        ))}
        {pagesCount.length > 5 && pageNumber < pagesCount.length - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <Link
            href={
              pageNumber < pagesCount.length
                ? `${route}?pageNumber=${pageNumber + 1}`
                : ""
            }
          >
            <PaginationNext
              aria-disabled={pageNumber === pagesCount.length}
              className={
                pageNumber === pagesCount.length
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;

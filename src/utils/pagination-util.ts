import { Injectable } from "@nestjs/common";

@Injectable()
export class PaginationUtil {
  generatePagination(
    itemCount: number,
    pageSize: number,
    currentPage: number = 1,
    baseUrl: string
  ): {meta: PaginationMeta; links: PaginationLinks} {
    const pageCount = Math.ceil(itemCount / pageSize);
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < pageCount;

    const buildLink = (pageNum: number) =>
      `${baseUrl}?page=${pageNum}&limit=${pageSize}`;

    const links = {
      first: buildLink(1),
      previous: hasPreviousPage ? buildLink(currentPage - 1) : null,
      next: hasNextPage ? buildLink(currentPage + 1) : null,
      last: buildLink(pageCount),
    };

    const meta: PaginationMeta = {
      page: currentPage,
      pageSize,
      itemCount,
      pageCount,
      hasPreviousPage,
      hasNextPage,
    };

    return { meta, links };
  }
}

export class PaginationMeta {
  page: number;
  pageSize: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export class PaginationLinks {
  first: string
  previous: string | null
  next: string | null
  last: string
}
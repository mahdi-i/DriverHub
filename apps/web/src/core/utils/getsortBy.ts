import { sortBy } from "../assets/@types/enum/sortBy";

export function getSortBy(sortType: sortBy): string {
  switch (sortType) {
    case sortBy.ASC:
      return "صعودی"; // Ascending
    case sortBy.DESC:
      return "نزولی"; // Descending
    default:
      return "نامشخص";
  }
}

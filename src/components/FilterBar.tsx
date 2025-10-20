import { ReactNode } from "react";
import Input from "./ui/input";
import Select from "./ui/select";
import Button from "./ui/button";
import { FilterIcon, GridIcon, ListIcon } from "./icons";
import { Platform } from "../lib/store";

export type FilterBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
  platform: Platform;
  filters?: ReactNode;
};

const FilterBar = ({ search, onSearchChange, viewMode, onViewModeChange, platform, filters }: FilterBarProps) => {
  return (
    <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--outline)] bg-[var(--surface-2)] px-4 py-4 shadow-sm">
      <div className="flex flex-1 items-center gap-3">
        <Input
          aria-label="콘텐츠 검색"
          placeholder={`${platform === "youtube" ? "동영상을" : "게시물을"} 검색하세요`}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="min-w-[220px] flex-1"
        />
        <Select aria-label="정렬 기준" defaultValue="date" className="min-w-[160px]">
          <option value="date">최신순</option>
          <option value="comments">댓글 많은순</option>
          <option value="flagged">신고 많은순</option>
        </Select>
        <Button variant="secondary" className="min-h-[44px]" aria-label="필터 더 보기">
          <FilterIcon className="h-4 w-4" />
          추가 필터
        </Button>
        {filters}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === "grid" ? "primary" : "secondary"}
          className="h-11 w-11 p-0"
          onClick={() => onViewModeChange("grid")}
          aria-pressed={viewMode === "grid"}
          aria-label="그리드 보기"
        >
          <GridIcon className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "table" ? "primary" : "secondary"}
          className="h-11 w-11 p-0"
          onClick={() => onViewModeChange("table")}
          aria-pressed={viewMode === "table"}
          aria-label="테이블 보기"
        >
          <ListIcon className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default FilterBar;

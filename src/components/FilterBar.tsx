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
    <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-4">
      <div className="flex flex-1 items-center gap-3">
        <Input
          aria-label="Search content"
          placeholder={`Search ${platform === "youtube" ? "videos" : "posts"}`}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="min-w-[220px] flex-1"
        />
        <Select aria-label="Sort results" defaultValue="date" className="min-w-[160px]">
          <option value="date">Sort by Date</option>
          <option value="comments">Sort by Comments</option>
          <option value="flagged">Sort by Flags</option>
        </Select>
        <Button variant="secondary" className="min-h-[44px]" aria-label="More filters">
          <FilterIcon className="h-4 w-4" />
          Filters
        </Button>
        {filters}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === "grid" ? "primary" : "secondary"}
          className="h-11 w-11 p-0"
          onClick={() => onViewModeChange("grid")}
          aria-pressed={viewMode === "grid"}
          aria-label="Grid view"
        >
          <GridIcon className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "table" ? "primary" : "secondary"}
          className="h-11 w-11 p-0"
          onClick={() => onViewModeChange("table")}
          aria-pressed={viewMode === "table"}
          aria-label="Table view"
        >
          <ListIcon className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default FilterBar;

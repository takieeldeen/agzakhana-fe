import { useGetBranchesList } from "@/api/branches";
import BranchItem from "../../components/branch-item";
import "leaflet/dist/leaflet.css";
import MapBox from "../../components/map-box";

export default function BranchesMapTab() {
  const { branches, branchesLoading } = useGetBranchesList();

  return (
    <div className="h-full flex flex-row gap-4">
      <div className="w-1/4 h-full overflow-y-scroll">
        <ul className="flex flex-col gap-1.5 rtl:pl-2">
          {branches?.map((branch) => (
            <BranchItem branch={branch} key={branch?.branchCode} />
          ))}
        </ul>
      </div>
      <div className="w-3/4">
        <MapBox branches={branches} />
      </div>
    </div>
  );
}

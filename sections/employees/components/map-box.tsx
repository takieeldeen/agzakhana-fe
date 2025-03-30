"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { BranchType } from "@/types/branches";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { BRANCH_STATUS } from "@/utilis/CONSTANTS";
import { formatDistances } from "@/utilis/numbers";

export default function MapBox({ branches }: { branches: BranchType[] }) {
  const { locale } = useParams();
  const t = useTranslations("BRANCHES_MANAGEMENT_PAGE");

  const pinIcon = new Icon({
    iconUrl:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMTcyNjJlIiBkPSJNMTIgMTEuNUEyLjUgMi41IDAgMCAxIDkuNSA5QTIuNSAyLjUgMCAwIDEgMTIgNi41QTIuNSAyLjUgMCAwIDEgMTQuNSA5YTIuNSAyLjUgMCAwIDEtMi41IDIuNU0xMiAyYTcgNyAwIDAgMC03IDdjMCA1LjI1IDcgMTMgNyAxM3M3LTcuNzUgNy0xM2E3IDcgMCAwIDAtNy03Ii8+PC9zdmc+",
    iconSize: [46, 46],
  });
  return (
    <MapContainer
      center={[30.044307066897545, 31.23203355015828]}
      zoom={10}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {branches?.map((branch) => (
        <Marker
          key={branch?.branchCode}
          position={branch?.location}
          icon={pinIcon}
        >
          <Popup className=" ">
            <div
              style={{ fontFamily: locale === "ar" ? "Cairo" : "Lato" }}
              className="rtl:text-right flex flex-col gap-0"
            >
              <span
                className="text-white text-base m-0 my-0"
                style={{ margin: "0px !important" }}
              >
                {branch?.name} (
                {formatDistances(branch?.distance, locale as "ar" | "en")})
              </span>
              <span
                className="text-gray-300 text-sm m-0 my-0"
                style={{ margin: "0px !important" }}
              >
                {branch?.address}
              </span>
              <div
                className={cn(
                  "text-center font-semibold",
                  BRANCH_STATUS?.[branch?.status]?.style
                )}
              >
                <div className="flex items-center gap-1.5 font-bold text-base ">
                  <div
                    className={cn(
                      BRANCH_STATUS?.[branch?.status]?.background,
                      "w-3 h-3 rounded-[50%]"
                    )}
                  >
                    &nbsp;
                  </div>
                  {branch?.status ? t(branch?.status) : "--"}
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPinIcon } from "lucide-react";
import Button from "../buttons";
import { useGetRegisterUsers } from "@/lib/hooks/api/queries";

export interface RegisteredUser {
  _id?: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  organizationName: string;
  City: string;
  State: string;
  localGovt: string;
  zipCode: number;
  Others?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

type Location = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
};

// Dynamically import the MapInner component (disables SSR for Leaflet)
const MapInner = dynamic(() => import("./mapInner"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-gray-100 animate-pulse flex items-center justify-center">
      Loading Map...
    </div>
  ),
});

const MapComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [center, setCenter] = useState<[number, number]>([7.3775, 3.947]); // Default center (Nigeria)
  const [locations, setLocations] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { data: users } = useGetRegisterUsers();

  // Fetch user locations and convert city/state to lat/lng
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationPromises = (users || []).map(async (user) => {
          const query = `${user.City}, ${user.State}, Nigeria`;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                query
              )}`
            );
            const data = await res.json();

            if (data.length > 0) {
              return {
                id: user._id || "",
                name: user.organizationName,
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
                address: `${user.City}, ${user.State}, ${user.zipCode}`,
              };
            }
          } catch (error) {
            console.error(`Error fetching coordinates for ${query}:`, error);
          }
          return null;
        });

        const resolvedLocations = (await Promise.all(locationPromises)).filter(
          (loc) => loc !== null
        ) as Location[];

        setLocations(resolvedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [users]);

  // Handle search functionality
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&country=nigeria`
      );
      const data = await response.json();

      if (data.length > 0) {
        setCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Get user’s current location
  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="bg-primaryDark p-6 rounded-lg h-min">
        <form onSubmit={handleSearch} className="space-y-4">
          <h2 className="text-white text-base md:text-lg">
            Enter your zip code or city, state abbreviation (e.g. Ife Central,
            Osun State) to find PharmaBin service locations near you.
          </h2>
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter ZIP Code, City, State..."
              className="w-full p-3 rounded-md bg-transparent border border-white/30 text-white focus:outline-none placeholder:text-white"
            />
          </div>

          <Button type="submit" className="w-full" variant="tertiary">
            {isSearching ? "Searching..." : "Search"}
          </Button>

          <button
            type="button"
            onClick={handleUseMyLocation}
            className="w-full flex items-center justify-center bg-transparent text-secondary font-semibold"
          >
            <MapPinIcon />
            Use My Location
          </button>
        </form>
      </div>
      <div className="lg:col-span-2 h-[500px] relative">
        <MapInner center={center} locations={locations} />
      </div>
    </div>
  );
};

export default MapComponent;

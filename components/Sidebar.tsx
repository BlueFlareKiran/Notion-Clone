"use client";
import React, { useEffect, useState } from "react";
import NewDocumentButton from "./NewDocumentButton";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { DocumentData } from "firebase-admin/firestore";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
  createdAt: string;
  userId: string;
  roomId: string;
  role: "owner" | "editor";
}

export default function Sidebar() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].emailAddress)
      )
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;

        if (roomData.role === "owner") {
          acc.owner.push(roomData);
        } else if (roomData.role === "editor") {
          acc.editor.push(roomData);
        }
        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );
    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <div className="flex flex-col items-center gap-4 w-full px-3">
      <NewDocumentButton />
      <div className="space-y-4 w-full text-center">
        {loading ? (
          <h2 className="text-gray-500 font-semibold text-sm">Loading...</h2>
        ) : error ? (
          <h2 className="text-red-500 font-semibold text-sm">Error loading documents</h2>
        ) : groupedData.owner.length === 0 && groupedData.editor.length === 0 ? (
          <h2 className="text-gray-500 font-semibold text-sm">
            No documents found
          </h2>
        ) : (
          <>
            {groupedData.owner.length > 0 && (
              <>
                <h2 className="text-gray-600 font-semibold text-sm">My Documents</h2>
                {groupedData.owner.map((doc) => (
                  <SidebarOption 
                    key={doc.roomId} 
                    id={doc.roomId} 
                    href={`/doc/${doc.roomId}`} 
                  />
                ))}
              </>
            )}
          
            {groupedData.editor.length > 0 && (
              <>
                <h2 className="text-gray-600 font-semibold text-sm mt-4">Shared with me</h2>
                {groupedData.editor.map((doc) => (
                  <SidebarOption 
                    key={doc.roomId} 
                    id={doc.roomId} 
                    href={`/doc/${doc.roomId}`} 
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-2 bg-gray-200 flex flex-col items-center space-y-8">
      {/* Menu for Mobile */}
      <div className="md:hidden flex justify-center w-full">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg transition-opacity" size={40} />
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col items-center">
            <SheetHeader className="w-full text-center">
              <SheetTitle className="text-lg font-bold mt-4">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col items-center w-full mt-6">
              {menuOptions}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Menu for Desktop */}
      <div className="hidden md:block w-full">
        {menuOptions}
      </div>
    </div>
  );
}
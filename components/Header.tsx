"use client";
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import Breadcrumbs from "./Breadcrumbs";

export default function Header() {
    const { user } = useUser();

    return (
        <div className="flex items-center justify-between p-5 ">
            {user && (
                <h1 className="text-2xl">
                    {user?.firstName}
                    {`'s`} Space
                </h1>
            )}

            <Breadcrumbs/>

            <div className="flex items-center gap-4">
                {/* Display profile icon and sign out button if signed in */}
                <SignedIn>
                    <UserButton />
                    {/* <SignOutButton /> */}
                </SignedIn>

                {/* Display sign-in button if signed out */}
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </div>
        </div>
    );
}

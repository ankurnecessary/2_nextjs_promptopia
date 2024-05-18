"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProvider } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = false;

  // Start: To help us sign in using social media handles
  // For the time being we are going to get only google handle
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProvider();
      setProviders(response);
    };

    setProviders();
  }, []);
  // End: To help us sign in using social media handles

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
          alt="Promptopia logo"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Mobile Navigation */}
      <div className="hidden sm:flex">
        {isUserLoggedIn ? (
          <div>
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src="/assets/images/logo.svg"
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="Profile"
                />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Start: Will show the social media buttons to sign in */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
            {/* End: Will show the social media buttons to sign in */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

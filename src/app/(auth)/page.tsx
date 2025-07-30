'use client'
import FeatureCard from "@/components/Card/featureCard";
import UnAuthNavbar from "@/components/Navbar/unAuthNavbar";
import { Search } from 'lucide-react';
import { File } from 'lucide-react';
import { Pin } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="fixed top-0 z-50 bg-white backdrop-blur shadow-sm md:px-10 w-full">
        <UnAuthNavbar />
      </div>

      <main className="text-center p-10 mx-15 mt-15">
        <div className="flex flex-col justify-center items-center gap-8 p-5">

          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-black min-w-md">
              Welcome to NotesApp
            </h1>

            <p className="text-gray-700 text-lg">
              The simple and elegant way to organize your thoughts and ideas.
            </p>
          </div>

          <button
            onClick={() => router.replace('/login')}
            className='bg-blue-500 text-white rounded-lg p-3 text-lg font-semibold focus:outline-none cursor-pointer'
          >
            Start Taking Notes
          </button>

        </div>
      </main>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2 mx-1 sm:mx-15">
        <FeatureCard
          icon={File}
          heading="Organized Notes"
          description="Keep all your documents structured and easy to access."
          textColor="text-blue-800"
          bgColor="bg-blue-200"
        />
        <FeatureCard
          icon={Search}
          heading="Smart Search"
          description="Quickly find your notes with intelligent keyword detection."
          textColor="text-green-800"
          bgColor="bg-green-200"
        />
        <FeatureCard
          icon={Pin}
          heading="Pin Important"
          description="Highlight and pin critical notes for instant visibility."
          textColor="text-purple-800"
          bgColor="bg-purple-200"
        />
      </div>
      

    </div>
  );
}
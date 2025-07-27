'use client'
import FeatureCard from "@/components/Card/featureCard";
import { Search } from 'lucide-react';
import { File } from 'lucide-react';
import { Pin } from 'lucide-react';

export default function Home() {

  return (
    <div className="mx-15">

      <main className="text-center p-10">
        <div className="flex flex-col justify-center items-center gap-8 p-5">

          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-black min-w-md">
              Welcome to NotesApp
            </h1>

            <p className="text-gray-700 text-lg">
              The simple and elegant way to organize your thoughts and ideas.
            </p>
          </div>

          <button className='bg-blue-500 text-white rounded-lg p-3 text-lg font-semibold focus:outline-none cursor-pointer'>
            Start Taking Notes
          </button>

        </div>
      </main>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2">
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
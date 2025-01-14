import React from 'react';
import { ArrowRight, Brain } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Brain className="w-16 h-16 text-accent" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your AI-Powered Business Intelligence Assistant
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Get instant market insights, analyze documents, and make data-driven decisions with Bizimate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-gray-700 px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
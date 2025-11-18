import React, { useEffect, useState } from 'react';
import { useResources } from '../hooks/useResources.js';
import { fetchCategories, fetchPopular } from '../lib/resourcesApi.js';
import ResourceCard from '../components/Resources/ResourceCard.jsx';
import ResourceFilters from '../components/Resources/ResourceFilters.jsx';
import PopularList from '../components/Resources/PopularList.jsx';
import CategoriesList from '../components/Resources/CategoriesList.jsx';
import SubscribeCTA from '../components/Resources/SubscribeCTA.jsx';
import Pagination from '../components/Resources/Pagination.jsx';
import { track } from '../lib/analytics.js';

export default function Resources() {
  const { state, dispatch, items, total } = useResources();
  const [categories, setCategories] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    fetchPopular().then(setPopular);
  }, []);

  useEffect(() => {
    track('resources_filter_apply', { ...state, count: items.length });
  }, [items.length]);

  return (
    <main className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="font-montserrat text-3xl font-bold text-black">Insights &amp; Resources</h1>
          <p className="font-opensans mt-2 text-[#2C3E50]">Stay informed with the latest financial insights, market analysis, and expert guidance to help you make smarter investment decisions.</p>
          <div className="mt-3 flex items-center gap-2 justify-center text-xs text-gray-700">
            <span className="rounded-full bg-gray-100 px-2 py-1">Updated Daily</span>
            <span className="rounded-full bg-gray-100 px-2 py-1">From Experts</span>
          </div>
        </div>

        <div className="mt-8">
          <ResourceFilters state={state} dispatch={dispatch} categories={categories} />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {items.map((r) => (
                <ResourceCard key={r.id} r={r} />
              ))}
            </div>
            <div className="mt-8">
              <Pagination
                page={state.page}
                total={total}
                pageSize={state.pageSize}
                onPage={(p) => dispatch({ type: 'page', page: p })}
              />
            </div>
          </div>
          <aside className="lg:col-span-3 space-y-6">
            <div className="rounded-lg border border-gray-200 p-4 bg-white">
              <h3 className="text-sm font-medium text-black">Stay Informed</h3>
              <SubscribeCTA />
            </div>
            <div className="rounded-lg border border-gray-200 p-4 bg-white">
              <h3 className="text-sm font-medium text-black">Popular Articles</h3>
              <div className="mt-3">
                <PopularList items={popular} />
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 bg-white">
              <h3 className="text-sm font-medium text-black">Categories</h3>
              <div className="mt-3">
                <CategoriesList categories={categories} />
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-12 bg-[#D4AF37]">
          <div className="mx-auto max-w-6xl px-4 md:px-6 py-20 text-center">
            <div className="font-montserrat text-lg font-semibold">Ready to Take Control of Your Financial Future?</div>
            <div className="font-opensans mt-2 text-sm">Get personalized financial advice from our expert advisors. Schedule your free consultation today.</div>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <a href="/contact" className="inline-block px-6 py-3 rounded-md border border-white text-white bg-transparent font-montserrat hover:bg-white/10">Book Consultation</a>
              <a href="#" className="inline-block px-6 py-3 rounded-md bg-white text-black font-montserrat hover:opacity-90">WhatsApp us</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
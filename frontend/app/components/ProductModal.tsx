'use client';

import React from 'react';
import Image from 'next/image';
import type { Product } from '../lib/types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative glass-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-20 pointer-events-none"></div>

        <div className="relative">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white p-6 rounded-t-3xl">
            <div className="absolute inset-0 opacity-10 rounded-t-3xl" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15h30M15 0v30' stroke='%23ffffff' stroke-opacity='0.5' fill='none'/%3E%3C/svg%3E\")" }}></div>
            <div className="relative flex justify-between items-start">
              <div className="flex-1 pr-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h2>
                {product.author && (
                  <p className="text-indigo-200 text-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    by {product.author}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 group"
              >
                <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image and Price */}
              <div>
                <div className="relative h-80 md:h-96 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl overflow-hidden mb-6 border border-zinc-700/50">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <svg className="w-24 h-24 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6 rounded-2xl border border-indigo-500/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
                  <div className="relative">
                    <div className="text-sm text-zinc-500 mb-1">Price</div>
                    <div className="text-4xl font-bold gradient-text">
                      £{product.price.toFixed(2)}
                    </div>
                    {product.details?.availability && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></span>
                        <span className="text-sm text-zinc-400">{product.details.availability}</span>
                      </div>
                    )}
                  </div>
                </div>

                <a
                  href={product.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 w-full block text-center relative overflow-hidden rounded-xl py-3 font-semibold transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative text-white flex items-center justify-center gap-2">
                    View on Original Site
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
              </div>

              {/* Details */}
              <div className="space-y-6">
                {product.details?.rating && (
                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-6 h-6 ${
                              i < Math.floor(product?.details?.rating!)
                                ? 'text-amber-400 fill-current'
                                : 'text-zinc-700'
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-zinc-300">
                        {product.details.rating}/5
                        {product.details.reviewCount && (
                          <span className="text-sm text-zinc-500 ml-2">
                            ({product.details.reviewCount} reviews)
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {product.details?.description && (
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Description
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">{product.details.description}</p>
                  </div>
                )}

                <div className="bg-zinc-800/50 border border-zinc-700/50 p-5 rounded-xl space-y-1">
                  <h3 className="text-xl font-bold text-zinc-100 mb-4">Product Details</h3>

                  {product.details?.isbn && (
                    <DetailRow icon="📚" label="ISBN" value={product.details.isbn} />
                  )}
                  {product.details?.publisher && (
                    <DetailRow icon="🏢" label="Publisher" value={product.details.publisher} />
                  )}
                  {product.details?.publicationDate && (
                    <DetailRow icon="📅" label="Publication Date" value={product.details.publicationDate} />
                  )}
                  {product.details?.format && (
                    <DetailRow icon="📖" label="Format" value={product.details.format} />
                  )}
                  {product.details?.pages && (
                    <DetailRow icon="📄" label="Pages" value={product.details.pages.toString()} />
                  )}
                  {product.details?.language && (
                    <DetailRow icon="🌐" label="Language" value={product.details.language} />
                  )}
                  {product.details?.dimensions && (
                    <DetailRow icon="📏" label="Dimensions" value={product.details.dimensions} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-zinc-700/50 last:border-0">
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <div className="text-sm text-zinc-500">{label}</div>
        <div className="text-zinc-200 font-medium">{value}</div>
      </div>
    </div>
  );
}

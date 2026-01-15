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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-3xl flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
            {product.author && (
              <p className="text-blue-100 text-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                by {product.author}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image and Price */}
            <div>
              <div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden mb-6 shadow-inner">
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
                    <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
                <div className="text-sm text-gray-600 mb-1">Price</div>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  £{product.price.toFixed(2)}
                </div>
                {product.details?.availability && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm text-gray-700">{product.details.availability}</span>
                  </div>
                )}
              </div>

              <a
                href={product.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View on Original Site
              </a>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {product.details?.rating && (
                <div className="bg-yellow-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.floor(product?.details?.rating!)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-700">
                      {product.details.rating}/5
                      {product.details.reviewCount && (
                        <span className="text-sm text-gray-500 ml-2">
                          ({product.details.reviewCount} reviews)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              )}

              {product.details?.description && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{product.details.description}</p>
                </div>
              )}

              <div className="bg-gray-50 p-5 rounded-xl space-y-3">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Product Details</h3>

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
  );
}

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-200 last:border-0">
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-gray-800 font-medium">{value}</div>
      </div>
    </div>
  );
}

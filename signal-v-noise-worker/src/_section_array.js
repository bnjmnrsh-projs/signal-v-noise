/*
      The sections listed, in the 'section' param in the API, may not always resolve to
        a section via https://www.nytimes.com/section/{section}.
      The list that appears on the top-stories doumentation, is also not complete.
      As there isn't an endpoint that I am aware of for getting an official list of sections,
      I'm rolling own.

      https://developer.nytimes.com/docs/top-stories-product/1/overview
  */
export const aSections = [
	'home',
	'arts',
	'automobiles',
	'books',
	'business',
	'climate',
	'dining',
	'fashion',
	'food',
	'health',
	'insider',
	'magazine',
	'movies',
	'nyregion',
	'obituaries',
	'opinion',
	'politics',
	'realestate',
	'science',
	'sports',
	'style',
	'sundayreview',
	'technology',
	'theater',
	't-magazine',
	'travel',
	'upshot',
	'us',
	'world'
]

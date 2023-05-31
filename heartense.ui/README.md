## Getting Started

1. Install required packages with:

```bash
npm install
# or 
yarn install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Navigating the front end code

This is the main structure of the front end and where you will find certain files:
```
.
└── heartense.ui/
    ├── actions/
    │   └── ** This is where endpoints, post requests and other .ts files will go **
    ├── components/
    │   ├── ** UI componenets like buttons etc **
    │   └── icons/
    │       └── ** SVG icons go here **
    ├── hooks/
    │   └── ** Custom hooks for requesting data from the api **
    ├── pages/
    │   ├── ** Main web pages **
    │   └── index.tsx (The inital page that is loaded)
    └── types/
        └── ** Custom typescript types **
```